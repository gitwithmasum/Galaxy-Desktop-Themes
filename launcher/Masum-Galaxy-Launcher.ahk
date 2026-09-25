#Requires AutoHotkey v2.0
#SingleInstance Force

; GALAXY LAUNCHER / MASUM BILLAH
; F8 opens or closes the palette. Change F8 below to ^!g for Ctrl+Alt+G.

global Palette := Gui("+AlwaysOnTop -Caption +ToolWindow", "Masum Galaxy Launcher")
global QueryBox := ""
global ResultRows := []
global AllItems := []
global VisibleItems := []
global Selected := 1

Palette.BackColor := "0B1024"
Palette.MarginX := 0
Palette.MarginY := 0
Palette.SetFont("s10 c55E7FF", "Consolas")
Palette.AddText("x22 y16 w515 h22", "✦  M A S U M   B I L L A H     / /     G A L A X Y")
Palette.SetFont("s9 c8899BF", "Segoe UI")
Palette.AddText("x22 y41 w515 h20", "F8  ·  ONE-KEY LAUNCHER                                       ◦  01 / ∞")
Palette.SetFont("s15 cECF6FF", "Segoe UI")
QueryBox := Palette.AddEdit("x22 y73 w516 h43 Background18233E", "")
QueryBox.OnEvent("Change", UpdateResults)
Palette.SetFont("s9 c7389AD", "Consolas")
Palette.AddText("x24 y131 w510 h19", "   RESULTS                                              ⌕  LIVE FILTER")

Loop 9 {
    index := A_Index
    Palette.SetFont("s11 cC9DEFF", "Segoe UI")
    row := Palette.AddText("x26 y" (154 + (index - 1) * 32) " w508 h29 +0x100", "")
    row.OnEvent("Click", RowClicked.Bind(index))
    ResultRows.Push(row)
}

Palette.SetFont("s9 c758BB5", "Segoe UI")
Palette.AddText("x23 y456 w520 h22", "↑↓  SELECT       ENTER  OPEN       ESC  CLOSE       TYPE  TO SEARCH")
Palette.OnEvent("Close", HidePalette)
Palette.OnEvent("Escape", HidePalette)

BuildItems()
UpdateResults()

F8::TogglePalette()

#HotIf WinActive("ahk_id " Palette.Hwnd)
Enter::OpenSelected()
Esc::HidePalette()
Down::MoveSelection(1)
Up::MoveSelection(-1)
#HotIf

TogglePalette(*) {
    global Palette, QueryBox
    if WinActive("ahk_id " Palette.Hwnd) {
        Palette.Hide()
        return
    }
    ; Reindex the Start menu so newly installed apps also appear.
    BuildItems()
    QueryBox.Value := ""
    UpdateResults()
    Palette.Show("w560 h488 Center")
    QueryBox.Focus()
}

HidePalette(*) {
    global Palette
    Palette.Hide()
}

BuildItems() {
    global AllItems
    AllItems := [
        {name: "GitHub  /  Galaxy Desktop Themes", type: "WEB", target: "https://github.com/gitwithmasum/Galaxy-Desktop-Themes"},
        {name: "GitHub  /  gitwithmasum", type: "WEB", target: "https://github.com/gitwithmasum"},
        {name: "ChatGPT", type: "WEB", target: "https://chatgpt.com/"},
        {name: "File Explorer", type: "FOLDER", target: "explorer.exe"},
        {name: "Downloads", type: "FOLDER", target: EnvGet("USERPROFILE") "\Downloads"},
        {name: "Documents", type: "FOLDER", target: A_MyDocuments},
        {name: "Desktop", type: "FOLDER", target: A_Desktop},
        {name: "Windows file search", type: "SEARCH", target: ""},
        {name: "Calculator", type: "APP", target: "calc.exe"},
        {name: "Notepad", type: "APP", target: "notepad.exe"},
        {name: "Settings", type: "APP", target: "ms-settings:"}
    ]
    seen := Map()
    for folder in [A_StartMenu, A_StartMenuCommon] {
        Loop Files, folder "\Programs\*.lnk", "R" {
            title := RegExReplace(A_LoopFileName, "i)\.lnk$")
            key := StrLower(title)
            if seen.Has(key)
                continue
            seen[key] := true
            AllItems.Push({name: title, type: "APP", target: A_LoopFileFullPath})
        }
    }
}

UpdateResults(*) {
    global QueryBox, AllItems, VisibleItems, Selected
    needle := Trim(QueryBox.Value)
    VisibleItems := []
    for item in AllItems {
        if (needle = "" || InStr(item.name, needle, false)) {
            VisibleItems.Push(item)
            if VisibleItems.Length >= 8
                break
        }
    }
    if (needle != "")
        VisibleItems.Push({name: "Search web for: " needle, type: "WEB SEARCH", target: needle})
    Selected := 1
    PaintRows()
}

PaintRows() {
    global ResultRows, VisibleItems, Selected
    for index, row in ResultRows {
        if (index > VisibleItems.Length) {
            row.Text := ""
            continue
        }
        item := VisibleItems[index]
        row.Text := (index = Selected ? "  ❯   " : "      ") item.name "    · " item.type
        row.SetFont(index = Selected ? "s11 c56E7FF Bold" : "s11 cC9DEFF Norm", "Segoe UI")
    }
}

MoveSelection(direction) {
    global Selected, VisibleItems
    if VisibleItems.Length = 0
        return
    Selected := Max(1, Min(VisibleItems.Length, Selected + direction))
    PaintRows()
}

RowClicked(index, *) {
    global Selected, VisibleItems
    if (index > VisibleItems.Length)
        return
    Selected := index
    OpenSelected()
}

OpenSelected(*) {
    global Selected, VisibleItems, Palette
    if (Selected > VisibleItems.Length)
        return
    item := VisibleItems[Selected]
    Palette.Hide()
    try {
        if item.type = "SEARCH"
            Send("#s")
        else if item.type = "WEB SEARCH"
            Run("https://www.google.com/search?q=" UriEncode(item.target))
        else
            Run(item.target)
    } catch as err {
        MsgBox("Could not open " item.name ".`n" err.Message, "Galaxy Launcher")
    }
}

UriEncode(value) {
    length := StrPut(value, "UTF-8")
    bytes := Buffer(length)
    StrPut(value, bytes, "UTF-8")
    encoded := ""
    Loop length - 1 {
        byte := NumGet(bytes, A_Index - 1, "UChar")
        if ((byte >= 65 && byte <= 90) || (byte >= 97 && byte <= 122)
            || (byte >= 48 && byte <= 57) || byte = 45 || byte = 46
            || byte = 95 || byte = 126)
            encoded .= Chr(byte)
        else
            encoded .= Format("%{:02X}", byte)
    }
    return encoded
}
