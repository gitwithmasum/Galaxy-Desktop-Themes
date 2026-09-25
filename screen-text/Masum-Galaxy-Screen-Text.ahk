#Requires AutoHotkey v2.0
#SingleInstance Force
Persistent

; Ctrl+Alt+S starts Microsoft PowerToys Text Extractor.
; Keep its PowerToys activation shortcut set to the default Win+Shift+T.
A_TrayMenu.Delete()
A_TrayMenu.Add('Screen Text: Ctrl+Alt+S', (*) => StartCapture())
A_TrayMenu.Add('Open PowerToys install guide', (*) => Run('https://learn.microsoft.com/en-us/windows/powertoys/install'))
A_TrayMenu.Add()
A_TrayMenu.Add('Exit', (*) => ExitApp())

^!s::StartCapture()

StartCapture(*) {
    ; PowerToys owns the OCR overlay and sends recognized text to the clipboard.
    ; If Text Extractor is disabled, PowerToys closed, or its hotkey changed,
    ; nothing will appear until it is enabled and Win+Shift+T is restored.
    Send('#+t')
}
