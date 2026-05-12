@echo off
chcp 65001 >nul
echo ======================================
echo Otvaram PC konfigurator V5 v Chrome
echo ======================================
echo.

set CHROME_PATH=""
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" set CHROME_PATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set CHROME_PATH="%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

if %CHROME_PATH%=="" (
    echo Chrome nenajdeny!
    pause
    exit /b 1
)

start "" %CHROME_PATH% "file:///C:/Users/M/Desktop/claud/konfigurator V5/PC_V5_FRESH_194945.html"

echo PC V5 konfigurator otvoreny.
pause
