@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
    py -3 bridge.py
) else (
    python bridge.py
)
echo.
echo Galaxy Bridge has stopped. If Python was not found, install Python 3.9 or newer.
pause
