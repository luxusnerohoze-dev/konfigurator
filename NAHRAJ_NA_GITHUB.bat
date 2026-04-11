@echo off
chcp 65001 >nul
echo ======================================
echo Nahravam subory na GitHub...
echo ======================================

cd /d "C:\Users\M\Desktop\claud\konfigurator V3"

if not exist ".git" (
    git init
    git branch -m master
)

git remote remove origin 2>nul
git remote add origin https://github.com/luxusnerohoze-dev/konfigurator.git

git add index.html konfigurator.jsx konfigurator_compiled.js konfigurator_preview.html README.md 91ThIMeaukL.jpg NAHRAJ_NA_GITHUB.bat .gitignore
git add images/

git commit -m "Update konfigurator - recompiled JSX"

git push -u origin master

echo.
echo ======================================
echo HOTOVO! Subory su na GitHube.
echo https://github.com/luxusnerohoze-dev/konfigurator
echo ======================================
pause
