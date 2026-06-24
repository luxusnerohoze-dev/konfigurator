@echo off
chcp 65001 >nul
echo ======================================
echo Inicializacia git repa pre V5
echo ======================================
echo.

cd /d "C:\Users\M\Desktop\claud\konfigurator V5"

REM Odstrani korruptny .git priecinok ak ostal po skopirovani
if exist ".git" (
    echo Odstranujem stary/korruptny .git priecinok...
    rmdir /s /q ".git"
)

REM Odstrani stare V4-specificke .bat skripty (aby sa V5 omylom nepushlo ako V4)
if exist "NAHRAJ_NA_GITHUB.bat" del /f /q "NAHRAJ_NA_GITHUB.bat"
if exist "NAHRAJ_V4_NA_GITHUB.bat" del /f /q "NAHRAJ_V4_NA_GITHUB.bat"

echo Inicializujem fresh git repository...
git init -b main
git config user.email "luxusnerohoze@gmail.com"
git config user.name "Michal Svancar"

echo.
echo Pridavam vsetky subory...
git add -A

echo.
echo Vytvaram prvy commit...
git commit -m "V5 initial commit - PC + phone konfigurator s opravami (popisky, scrolly, swatches, suhrn, door sync)"

echo.
echo Pripajam GitHub remote (povodny repo, V5 ako branch)...
git remote add origin https://github.com/luxusnerohoze-dev/konfigurator.git

echo.
echo Pushujem na GitHub ako branch V5...
git push -u origin main:V5

echo.
echo ======================================
echo HOTOVO! V5 je na GitHube ako branch:
echo https://github.com/luxusnerohoze-dev/konfigurator/tree/V5
echo ======================================
echo.
echo Lokalny branch:  main
echo Remote branch:   V5
echo.
echo Bezne pushovanie: spusti NAHRAJ_V5_NA_GITHUB.bat
pause
