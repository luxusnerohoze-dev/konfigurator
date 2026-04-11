@echo off
chcp 65001 >nul
echo ========================================
echo  Nahravam subory na GitHub...
echo ========================================

cd /d "C:\Users\svanc\Desktop\claude\konfigurator\konfigurator"

if not exist ".git" (
    git init
    git branch -m main
)

git remote remove origin 2>nul
git remote add origin https://github.com/luxusnerohoze-dev/konfigurator-truck-mats.git

git add index.html konfigurator.jsx konfigurator_compiled.js README.md
git commit -m "Initial commit - konfigurator project"
git push -u origin main

echo.
echo ========================================
echo  HOTOVO! Subory su na GitHube.
echo  https://github.com/luxusnerohoze-dev/konfigurator-truck-mats
echo ========================================
pause
