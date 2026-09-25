#Requires AutoHotkey v2.0
#SingleInstance Force

; MASUM BILLAH / GALAXY MODES
; F9 opens the mode panel. Ctrl+Alt+1/2/3 switches directly.
; Keep this file next to the wallpapers folder after extracting the ZIP.

global StateFile := A_ScriptDir "\mode-state.ini"
global PreviousWallpaper := IniRead(StateFile, "Wallpaper", "Original", "")
global CurrentMode := ""
global TimerEnd := 0
global ModeWindow := Gui("+AlwaysOnTop -MaximizeBox", "Masum Galaxy Modes")
global StatusLabel := ""
global DetailLabel := ""
global TimerLabel := ""
global ToolButton := ""
global TimerButton := ""

ModeWindow.BackColor := "0B1024"
ModeWindow.MarginX := 0
ModeWindow.MarginY := 0
ModeWindow.SetFont("s16 c72DDFF Bold", "Segoe UI")
ModeWindow.AddText("x26 y19 w550 h35", "✦   MASUM BILLAH  /  GALAXY MODES")
ModeWindow.SetFont("s10 c8798BA", "Segoe UI")
ModeWindow.AddText("x28 y58 w545 h21", "CHOOSE A SPACE FOR WHAT YOU ARE DOING")

ModeWindow.SetFont("s11 cECF7FF", "Segoe UI")
ModeWindow.AddButton("x27 y96 w173 h56", "01   STUDY").OnEvent("Click", (*) => ApplyMode("Study"))
ModeWindow.AddButton("x211 y96 w173 h56", "02   CODING").OnEvent("Click", (*) => ApplyMode("Coding"))
ModeWindow.AddButton("x395 y96 w173 h56", "03   GAMING").OnEvent("Click", (*) => ApplyMode("Gaming"))

ModeWindow.SetFont("s12 c72DDFF Bold", "Consolas")
StatusLabel := ModeWindow.AddText("x29 y175 w545 h26", "◈  NO MODE SELECTED")
ModeWindow.SetFont("s10 cB9C6DF", "Segoe UI")
DetailLabel := ModeWindow.AddText("x29 y209 w540 h39", "Select a mode to change the desktop wallpaper.")
ModeWindow.SetFont("s10 c9CE4F7", "Consolas")
TimerLabel := ModeWindow.AddText("x29 y252 w540 h24", "TIMER  /  INACTIVE")

ModeWindow.SetFont("s9 c112039", "Segoe UI")
ToolButton := ModeWindow.AddButton("x27 y296 w172 h39", "OPEN MODE TOOL")
ToolButton.OnEvent("Click", OpenModeTool)
TimerButton := ModeWindow.AddButton("x211 y296 w172 h39", "START TIMER")
TimerButton.OnEvent("Click", StartModeTimer)
TimerButton.Enabled := false
ModeWindow.AddButton("x395 y296 w173 h39", "NOTIFICATIONS").OnEvent("Click", OpenNotificationSettings)
ModeWindow.AddButton("x27 y350 w173 h36", "RESTORE WALLPAPER").OnEvent("Click", RestoreWallpaper)
ModeWindow.SetFont("s9 c8192B1", "Segoe UI")
ModeWindow.AddText("x217 y358 w352 h20", "F9  PANEL     CTRL+ALT+1/2/3  SWITCH")
ModeWindow.OnEvent("Close", (*) => ModeWindow.Hide())
ModeWindow.OnEvent("Escape", (*) => ModeWindow.Hide())

A_TrayMenu.Delete()
A_TrayMenu.Add("Open Galaxy Modes (F9)", (*) => ToggleModePanel())
A_TrayMenu.Add()
A_TrayMenu.Add("Study", (*) => ApplyMode("Study"))
A_TrayMenu.Add("Coding", (*) => ApplyMode("Coding"))
A_TrayMenu.Add("Gaming", (*) => ApplyMode("Gaming"))
A_TrayMenu.Add("Restore previous wallpaper", (*) => RestoreWallpaper())
A_TrayMenu.Add()
A_TrayMenu.Add("Exit", (*) => ExitApp())

F9::ToggleModePanel()
^!1::ApplyMode("Study")
^!2::ApplyMode("Coding")
^!3::ApplyMode("Gaming")

ToggleModePanel(*) {
    global ModeWindow
    if WinActive("ahk_id " ModeWindow.Hwnd)
        ModeWindow.Hide()
    else
        ModeWindow.Show("w595 h405 Center")
}

ApplyMode(name) {
    global CurrentMode, PreviousWallpaper, StateFile, ModeWindow
    global StatusLabel, DetailLabel, TimerLabel, TimerButton, ToolButton, TimerEnd
    wallpaper := A_ScriptDir "\wallpapers\" name "-" (name = "Study" ? "Moon" : name = "Coding" ? "Earth" : "Mars") ".jpg"
    if !FileExist(wallpaper) {
        MsgBox("Wallpaper missing:`n" wallpaper, "Galaxy Modes")
        return
    }
    if (PreviousWallpaper = "") {
        try PreviousWallpaper := RegRead("HKCU\Control Panel\Desktop", "WallPaper", "")
        if (PreviousWallpaper != "")
            IniWrite(PreviousWallpaper, StateFile, "Wallpaper", "Original")
    }
    if !SetWallpaper(wallpaper) {
        MsgBox("Windows could not set this wallpaper.", "Galaxy Modes")
        return
    }
    CurrentMode := name
    TimerEnd := 0
    SetTimer(UpdateTimer, 0)
    TimerLabel.Text := "TIMER  /  INACTIVE"
    if name = "Study" {
        StatusLabel.Text := "◈  STUDY MODE  /  MOON"
        DetailLabel.Text := "Quiet moon wallpaper  ·  Calendar shortcut  ·  50 min focus timer"
        ToolButton.Text := "OPEN CALENDAR"
        TimerButton.Text := "START 50 MIN"
        TimerButton.Enabled := true
    } else if name = "Coding" {
        StatusLabel.Text := "◈  CODING MODE  /  EARTH"
        DetailLabel.Text := "Earth orbit wallpaper  ·  VS Code shortcut  ·  25 min sprint"
        ToolButton.Text := "OPEN VS CODE"
        TimerButton.Text := "START 25 MIN"
        TimerButton.Enabled := true
    } else {
        StatusLabel.Text := "◈  GAMING MODE  /  MARS"
        DetailLabel.Text := "Mars wallpaper  ·  Windows Game Mode settings shortcut"
        ToolButton.Text := "GAME MODE SETTINGS"
        TimerButton.Text := "NO TIMER"
        TimerButton.Enabled := false
    }
    ModeWindow.Show("w595 h405 Center")
}

SetWallpaper(path) {
    ; SPI_SETDESKWALLPAPER = 0x14; update profile and broadcast change = 0x03.
    return DllCall("user32\SystemParametersInfoW", "UInt", 0x14, "UInt", 0, "Str", path, "UInt", 0x03, "Int")
}

RestoreWallpaper(*) {
    global PreviousWallpaper, StateFile, CurrentMode, StatusLabel, DetailLabel, TimerLabel, TimerEnd, ToolButton, TimerButton
    if (PreviousWallpaper = "" || !FileExist(PreviousWallpaper)) {
        MsgBox("No earlier picture was saved. Set your previous wallpaper in Windows Wallpaper & style.", "Galaxy Modes")
        return
    }
    if !SetWallpaper(PreviousWallpaper) {
        MsgBox("Could not restore the previous wallpaper.", "Galaxy Modes")
        return
    }
    IniDelete(StateFile, "Wallpaper", "Original")
    PreviousWallpaper := ""
    CurrentMode := ""
    TimerEnd := 0
    SetTimer(UpdateTimer, 0)
    StatusLabel.Text := "◈  PREVIOUS WALLPAPER RESTORED"
    DetailLabel.Text := "Choose another mode whenever you're ready."
    TimerLabel.Text := "TIMER  /  INACTIVE"
    ToolButton.Text := "OPEN MODE TOOL"
    TimerButton.Text := "START TIMER"
    TimerButton.Enabled := false
}

OpenModeTool(*) {
    global CurrentMode
    try {
        if CurrentMode = "Study"
            Run("https://calendar.google.com/")
        else if CurrentMode = "Coding"
            OpenVSCode()
        else if CurrentMode = "Gaming"
            Run("ms-settings:gaming-gamemode")
        else
            MsgBox("Choose a mode first.", "Galaxy Modes")
    } catch as err {
        MsgBox("Could not open that tool.`n" err.Message, "Galaxy Modes")
    }
}

OpenVSCode() {
    candidates := [
        EnvGet("LOCALAPPDATA") "\Programs\Microsoft VS Code\Code.exe",
        EnvGet("ProgramFiles") "\Microsoft VS Code\Code.exe"
    ]
    for path in candidates {
        if FileExist(path) {
            Run('"' path '"')
            return
        }
    }
    try {
        Run("code")
    } catch {
        MsgBox("VS Code not found. Open it from Start, or edit OpenVSCode() in this script with your Code.exe path.", "Galaxy Modes")
    }
}

OpenNotificationSettings(*) {
    Run("ms-settings:notifications")
}

StartModeTimer(*) {
    global CurrentMode, TimerEnd, TimerLabel
    if CurrentMode != "Study" && CurrentMode != "Coding"
        return
    minutes := CurrentMode = "Study" ? 50 : 25
    TimerEnd := A_TickCount + minutes * 60000
    SetTimer(UpdateTimer, 1000)
    UpdateTimer()
}

UpdateTimer() {
    global TimerEnd, TimerLabel
    if TimerEnd = 0
        return
    seconds := Max(0, Ceil((TimerEnd - A_TickCount) / 1000))
    TimerLabel.Text := "TIMER  /  " Format("{:02}:{:02}", Floor(seconds / 60), Mod(seconds, 60)) " REMAINING"
    if seconds = 0 {
        TimerEnd := 0
        SetTimer(UpdateTimer, 0)
        SoundBeep(900, 200)
        MsgBox("Session complete. Time for a break!", "Galaxy Modes")
    }
}
