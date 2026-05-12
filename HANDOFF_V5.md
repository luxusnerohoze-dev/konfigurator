# V5 — fork z V4

**Dátum forku:** 2026-05-08
**Pôvod:** `C:\Users\M\Desktop\claud\konfigurator V4`
**Cieľ:** `C:\Users\M\Desktop\claud\konfigurator V5`

## Prečo V5

V4 začal crashovať Claude Code pri písaní do chatu. Príčina:
- `.git` priečinok mal **1.3 GB** (binárne súbory v histórii)
- `konfigurator.jsx` má **9.7 MB** (single file)
- `index.html` a `konfigurator_compiled.js` po **9.6 MB**
- Spolu 1.4 GB → Claude session loadoval príliš veľký kontext

V5 = čistá kópia bez balastu.

## Čo V5 obsahuje (105 MB total)

Skopírované zo V4:
- `index.html`, `konfigurator.jsx`, `konfigurator_compiled.js`, `konfigurator_preview.html` — vrátane neuložených zmien z V4 (z 4. mája 2026)
- `compile_jsx.js`, `compile_jsx_dryrun.js` — build pipeline
- `package.json`, `package-lock.json`
- `cennik_konfigurator.xlsx`, `kamiony_znacky_modely.xlsx` — dáta
- `images/`, `phone/` — assety
- `step4_preview.jsx`, `91ThIMeaukL.jpg`
- `HANDOFF.md` (V4 verzia, pre referenciu), `README.md`, `.gitignore`
- `SYNC_PHONE_TO_DISK.bat`

Vynechané (úmyselne):
- `.git` (1.3 GB ballast — V5 dostane fresh git)
- `node_modules` (preinštaluje sa cez `npm install`)
- `*.BACKUP` súbory (~30 MB redundancia)
- `_compiled_test.js` (9.6 MB temp)
- `konfigurator.jsx.bak-before-polish` (untracked backup)

## Inicializácia (klikni)

1. **Spusti `INIT_V5_GIT.bat`** — vyčistí korruptný .git (ak ostal), urobí fresh git init, prvý commit.
2. **Pripoj GitHub remote** — vyber jednu možnosť (skript ti ich vypíše):
   - **A) Nový repo** `konfigurator-V5` (čisté, žiadny ballast z V4)
   - **B) Push do V4 repa ako branch `V5`** (zachová prepojenie)
3. **Bežné pushovanie** — `NAHRAJ_V5_NA_GITHUB.bat`

## Build pipeline

Rovnaká ako V4: `node compile_jsx.js` skompiluje `konfigurator.jsx` → `konfigurator_compiled.js` a sync do `index.html` + `konfigurator_preview.html` (4 súbory).

## Ako začať V5 chat

1. Otvor nový Claude Code chat
2. **`cd "C:\Users\M\Desktop\claud\konfigurator V5"`** pred štartom (alebo `--add-dir`)
3. **Memory:** `project_konfigurator.md` aktualizovaná na V5 path
4. Crashovanie by malo zmiznúť — bez 1.3 GB .git balastu Claude loaduje len reálny kód
