@echo off
chcp 65001 >nul
echo ==========================================
echo Synchronizujem phone subfolder do
echo C:\Users\M\Desktop\claud\konfigurator V4 phone
echo ==========================================

xcopy /E /I /Y "C:\Users\M\Desktop\claud\konfigurator V4\phone" "C:\Users\M\Desktop\claud\konfigurator V4 phone"

echo.
echo Hotovo. Mobile verzia je teraz aj v separatnom prieinku.
pause
