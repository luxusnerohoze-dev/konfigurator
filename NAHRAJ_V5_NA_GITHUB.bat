@echo off
chcp 65001 >nul
echo ======================================
echo Nahravam V5 subory na GitHub...
echo ======================================

cd /d "C:\Users\M\Desktop\claud\konfigurator V5"

git add .
git commit -m "V5 update"
git push

echo.
echo ======================================
echo HOTOVO!
echo ======================================
pause
