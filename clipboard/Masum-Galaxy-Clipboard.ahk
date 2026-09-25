#Requires AutoHotkey v2.0
#SingleInstance Force
Persistent

; Galaxy Clipboard: F10 opens recent text. Everything stays in RAM.
global History := []
global Visible := []
global MaxEntries := 30
global MaxChars := 20000
global IgnoreChanges := false
global TargetHwnd := 0

global Panel := Gui('+AlwaysOnTop -MaximizeBox +MinSize590x450', 'Masum Galaxy Clipboard')
Panel.BackColor := '0B1024'
Panel.MarginX := 18
Panel.MarginY := 18
Panel.SetFont('s15 c66DEFF Bold', 'Segoe UI')
Panel.AddText('w560 h32', '✦  GALAXY CLIPBOARD')
Panel.SetFont('s9 c91A9CF', 'Segoe UI')
Panel.AddText('w560 h28', 'MASUM BILLAH   /   F10 HISTORY   /   SESSION ONLY')
Panel.SetFont('s10 cDFEDFF', 'Segoe UI')
global Search := Panel.AddEdit('w550 h31 Background192743', '')
Search.OnEvent('Change', RefreshList)
global Items := Panel.AddListView('w550 h300 Grid -Multi Background101B36 cDEEBFF', ['#', 'Copied text or link'])
Items.ModifyCol(1, 38)
Items.ModifyCol(2, 482)
Items.OnEvent('DoubleClick', PasteRow)
Panel.SetFont('s9 cAFC4E8', 'Segoe UI')
Panel.AddButton('w113 h29 x18 y416', 'PASTE').OnEvent('Click', PasteSelected)
Panel.AddButton('w113 h29 x141 y416', 'COPY ONLY').OnEvent('Click', CopySelected)
Panel.AddButton('w113 h29 x264 y416', 'CLEAR ALL').OnEvent('Click', ClearHistory)
Panel.AddButton('w113 h29 x387 y416', 'CLOSE').OnEvent('Click', HidePanel)
Panel.OnEvent('Close', HidePanel)
Panel.OnEvent('Escape', HidePanel)

A_TrayMenu.Delete()
A_TrayMenu.Add('Open Galaxy Clipboard (F10)', TogglePanel)
A_TrayMenu.Add('Clear clipboard history', ClearHistory)
A_TrayMenu.Add()
A_TrayMenu.Add('Exit', (*) => ExitApp())
OnClipboardChange(WatchClipboard)
; Include text already on the clipboard when started.
if (A_Clipboard != '')
    AddItem(A_Clipboard)

F10::TogglePanel()
#HotIf WinActive('ahk_id ' Panel.Hwnd)
Enter::PasteSelected()
Esc::HidePanel()
#HotIf

WatchClipboard(type) {
    global IgnoreChanges
    if (type != 1 || IgnoreChanges)
        return
    try AddItem(A_Clipboard)
}

AddItem(value) {
    global History, MaxEntries, MaxChars
    if (value = '' || StrLen(value) > MaxChars)
        return
    for index, existing in History {
        if (existing = value) {
            History.RemoveAt(index)
            break
        }
    }
    History.InsertAt(1, value)
    if (History.Length > MaxEntries)
        History.Pop()
    RefreshList()
}

RefreshList(*) {
    global History, Search, Items, Visible
    keyword := StrLower(Trim(Search.Value))
    Visible := []
    Items.Delete()
    for entry in History {
        if (keyword != '' && !InStr(StrLower(entry), keyword))
            continue
        Visible.Push(entry)
        preview := RegExReplace(entry, '[\r\n\t]+', '  ')
        if (StrLen(preview) > 110)
            preview := SubStr(preview, 1, 107) '…'
        Items.Add(, Format('{:02}', Visible.Length), preview)
    }
    if (Visible.Length)
        Items.Modify(1, 'Select Focus Vis')
}

TogglePanel(*) {
    global Panel, TargetHwnd, Search
    if WinActive('ahk_id ' Panel.Hwnd) {
        Panel.Hide()
        return
    }
    TargetHwnd := WinExist('A')
    Search.Value := ''
    RefreshList()
    Panel.Show('w590 h460 Center')
    Search.Focus()
}

HidePanel(*) {
    global Panel
    Panel.Hide()
}

PasteRow(control, row) {
    if (row)
        UseItem(row, true)
}

PasteSelected(*) {
    global Items
    UseItem(Items.GetNext(0, 'Selected'), true)
}

CopySelected(*) {
    global Items
    UseItem(Items.GetNext(0, 'Selected'), false)
}

UseItem(row, paste) {
    global Visible, TargetHwnd, IgnoreChanges, Panel
    if (row < 1 || row > Visible.Length)
        return
    value := Visible[row]
    IgnoreChanges := true
    A_Clipboard := value
    SetTimer(EnableCapture, -300)
    Panel.Hide()
    if (!paste)
        return
    if (TargetHwnd && WinExist('ahk_id ' TargetHwnd)) {
        WinActivate('ahk_id ' TargetHwnd)
        if WinWaitActive('ahk_id ' TargetHwnd, , 1)
            Send('^v')
    }
}

EnableCapture() {
    global IgnoreChanges
    IgnoreChanges := false
}

ClearHistory(*) {
    global History, Visible, Search
    History := []
    Visible := []
    Search.Value := ''
    RefreshList()
    ; Current system clipboard remains available to other programs.
}
