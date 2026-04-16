@echo off
chcp 65001 >nul
echo ======================================
echo Nahravam V4 subory na GitHub...
echo ======================================

cd /d "C:\Users\M\Desktop\claud\konfigurator V4"

if not exist ".git" (
    git init
    git branch -m master
    git remote add origin https://github.com/luxusnerohoze-dev/konfigurator.git
)

git add .

git commit -m "Update V4 - cennik a aktualizovane subory"

git push -u origin master

echo.
echo ======================================
echo HOTOVO! Subory su na GitHube.
echo https://github.com/luxusnerohoze-dev/konfigurator
echo ======================================
pause
