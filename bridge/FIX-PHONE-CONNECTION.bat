@echo off
cd /d "%~dp0"
echo Masum Galaxy Bridge - private Wi-Fi connection repair
echo This adds one inbound rule for TCP 8765 on Private networks, local subnet only.
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0FIX-PHONE-CONNECTION.ps1"
echo.
pause
