# Handoff dokument — konfigurator V4

Tento dokument je určený pre ďalšiu Claude session (alebo iného agenta), aby vedela kontext projektu a pracovné konvencie. Posledná session: 2026-05-02.

---

## 1. Projekt v skratke

- **Vlastník:** Michal Švancár, **Luxury Car Design** (luxurycardesign.sk/cz)
- **Produkt:** kamiónový konfigurátor luxusných autokobercov **Dragonskin Diamond Line**
- **Tech stack:** React 18 + JSX + Babel (pre-compile), single-file HTML, žiadny bundler ani Vite
- **Repo:** https://github.com/luxusnerohoze-dev/konfigurator (public, branch `master`)
- **Lokálny pracovný priečinok:** `C:\Users\M\Desktop\claud\konfigurator V4`
- **Aktuálny commit:** `abad847` (UI polish — biele karty + zelené tlačidlá + scroll 4/B→4/C)

---

## 2. Štruktúra súborov

| Súbor | Účel |
|---|---|
| `konfigurator.jsx` | **Zdroj pravdy.** ~3700 riadkov JSX. Vždy edituj iba tento. |
| `konfigurator_compiled.js` | Pre-compile výstup z babel (compact). Generovaný. |
| `index.html` | Production HTML — má inline React + ReactDOM + skompilovaný komponent. Generovaný. |
| `konfigurator_preview.html` | Duplicitný preview. Generovaný. |
| `compile_jsx.js` | Build skript (node). Spúšťa babel a synchronizuje 3 výstupné súbory. |
| `package.json` | `@babel/core`, `@babel/preset-react` ako devDependencies. |
| `images/materials/`, `images/lemovanie/`, `images/nasivky/`, `images/nite/`, `images/misc/` | Asset zdroje. |
| `91ThIMeaukL.jpg` | Hero fotka (sekcia 01 v popise). |
| `kamiony_znacky_modely.xlsx` | Zdrojový Excel — značky/modely/ročníky kamiónov. |
| `cennik_konfigurator.xlsx` | Zdrojový Excel — ceny. |
| `NAHRAJ_V4_NA_GITHUB.bat` | Windows skript pre git push (Michal používa lokálne). |

### Build pipeline

```
konfigurator.jsx
   │
   │ node compile_jsx.js
   ▼
konfigurator_compiled.js   ──┐
                              ├──► nainjektované do <script> v
index.html                  ──┤   index.html aj preview
konfigurator_preview.html   ──┘
```

**Dôležité:** index.html nepoužíva babel-standalone runtime — kompilácia je vopred. Bez `node compile_jsx.js` sa zmena v `.jsx` v prehliadači neprejaví.

---

## 3. Štandardný workflow pri úprave

```bash
# 1) Edit JSX
# vim/edit konfigurator.jsx

# 2) Compile (synchronizuje 3 cieľové súbory)
node compile_jsx.js

# 3) Verifikuj syntaxu
node --check konfigurator_compiled.js

# 4) Commit + push (Michal chce po KAŽDEJ zmene)
git add index.html konfigurator.jsx konfigurator_compiled.js konfigurator_preview.html
git commit -m "<popis>"
git push "https://luxusnerohoze-dev:<TOKEN>@github.com/luxusnerohoze-dev/konfigurator.git" master
```

### Lock workaround (Cowork sandbox)

Ak je `.git/index.lock` alebo `.git/HEAD.lock` zablokovaný (sandbox neumožní rm):
1. Volaj `mcp__cowork__allow_cowork_file_delete` na danú cestu
2. `rm -f .git/index.lock .git/HEAD.lock`
3. Pokračuj s git príkazmi

Alternatíva keď ani to nepomôže: `GIT_INDEX_FILE=/tmp/alt_idx git read-tree HEAD && GIT_INDEX_FILE=/tmp/alt_idx git add ... && GIT_INDEX_FILE=/tmp/alt_idx git commit ...` — používa alternatívny index, nedotkne sa locku.

### PAT token

- Aktívny classic PAT s `repo` scope: viď memory `reference_github_token.md`
- Funguje pre všetky repá Michala (`konfigurator`, `kontakty-app`, `vzorky`)
- Token nikdy neukladaj do `git config` — vždy ho daj inline do URL

---

## 4. Architektúra konfigurátora (UI flow)

### 6-krokový akordeónový proces

| Krok | ID | Obsah |
|---|---|---|
| 1 | `konfig-step-1` | Špecifikácia vozidla (značka, model, prevodovka, sedadlo, zásuvky, brzda, podlaha) |
| 2 | `konfig-step-2` | Materiál + farba kobercov |
| 3 | `konfig-step-3` | Lemovanie |
| 4 | `konfig-step-4` | Nášivky — sub-akordeóny: |
|   | `konfig-sub-4a` | Umiestnenie (boky / stred / boky+stred / nechcem) |
|   | `konfig-sub-4b` | Výber nášivky pre boky + farba nite |
|   | `konfig-sub-4c` | Výber nášivky pre stred + farba nite |
| 5 | `konfig-step-5` | Dverové panely — sub-akordeóny: |
|   | `konfig-sub-5a` | Áno/Nie výber |
|   | `konfig-sub-5b` | Materiál + farba |
|   | `konfig-sub-5c` | Lemovanie |
|   | `konfig-sub-5d` | Nášivky áno/nie |
|   | `konfig-sub-5e` | Nášivka detail (výber + niť) |
| — | `konfig-suhrn` | Sumár objednávky + tlačidlo "Pridať do košíka" |

### Kľúčové konštanty (v hornej časti `konfigurator.jsx`)

- `CONFIG` (r. 6+): strom značka → model → ročník → prevodovka/sedadlo/...
- `FIELD_META` (r. 172): labels + ikony pre Step 1 dropdowny (color je `#C5A44E` pre všetky)
- `FIELD_ORDER` (r. 181): poradie polí v Step 1
- `MATERIALS` (r. 186): materiály a ich farby/swatche
- `LEMOVANIE` (r. 258), `NASIVKY` (r. 274), `NITE_FARBY` (r. 495)
- `PRICES` (r. 514): všetky ceny — base, materiál, lemovanie, nášivky (single + bundle), tapacír, atď.

### Brand farby

- Zlatá hlavná: `#C5A44E`
- Zlatá tmavšia: `#A8893A`
- Tmavohnedá: `#2E1810` / `#4a2a1a`
- Zelená CTA: `linear-gradient(135deg, #4CAF50, #388E3C)` (svetlá), `#2E7D32 → #1B5E20` (aktívna)
- Žltkasté pozadie question banneru: `linear-gradient(135deg, #fff8dc, #f5ebc6)`
- Pozadie kariet: `#fff` (biele — odlíšenie od question banneru)
- Active state karty: `#fdf8ec` (jemne tónované)

---

## 5. Dôležité pravidlá v kóde

1. **Auto-scroll po `setOpenSection(N)`:** vždy nasleduje `setTimeout(() => { const el = document.getElementById("konfig-step-N"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 450);`. Delay **450 ms** kvôli CSS `max-height` tranzícii akordeonu (0.4s ease).
2. **`scrollMarginTop: 20`** je nastavený na všetkých akordeónoch a sumári.
3. **Validation scroll** (pri kliku na "Pridať do košíka" bez vyplnenia): existujú v r. 3380+ a používajú rovnaký pattern.
4. **"Najobľúbenejšie" karty** (8 ks): klasická karta + zlatý rámček + biele pozadie + zlatý pill badge `★ Najobľúbenejšie` v `top: -10, right: 12`. 5 z nich má dedicated zelené tlačidlo "Vybrať" / "↻ Zmeniť". 3 bestseller karty (boky+stred, áno výplne, áno nášivky) sú clickable celé bez dedicated tlačidla, ale obsahujú info o cene s preškrtnutou "samo" cenou + bundle cenou + zelený badge so zľavou.
5. **Žiadne `cta-rychla-volba` class ani `ctaGoldPulse` keyframes** — tieto boli odstránené, nepoužívať.
6. **Error state** používa `#CC0000` (červená) — to NIE JE deprecated, je to univerzálna error semantika.
7. **`Dropdown` komponent** (Step 1): biele pozadie vždy, sivý rámček `#ddd` keď prázdne, zlatý `#C5A44E` keď vybraté. `color` prop je nepoužitý (zachovaný v API kvôli back-compat).

---

## 6. Dnešná session — chronologický prehľad

| Commit | Popis |
|---|---|
| `190af47` | Pridaný plnoširoký popis produktu pod konfigurátor (10 dôvodov, 3 štatistiky, sekcie 01-08, "Čo obsahuje balenie") + babel build pipeline (`compile_jsx.js`, `package.json`) |
| `9235ee8` | Odstránený box "Farebné kódovanie" z konca pravej časti |
| `578d4f1` | Aktualizácia cenníka (xlsx) |
| `17c4b42` | UI: zlatá `#C5A44E` zjednotená pre špec vozidla + auto-scroll po Pokračovať + 5 same-as CTA bannerov nahradených klasickou kartou + súhrn v slovenčine ("ZVÝHODNENÉ" namiesto "BUNDLE") s väčšími fontmi |
| `3868855` | Fix 3 zabudnuté BESTSELLER bannery (boky+stred, áno výplne dverí, áno nášivky panely) — rovnaký štýl ako 5 same-as |
| `4c3f70e` | `Dropdown` komponent — biele pozadie, neutrálny rámček (žiadne per-field farby) |
| `abad847` | Biele pozadie kariet (rozlíšenie od žltkastého question banneru) + zelené veľké tlačidlá "Vybrať" + auto-scroll 4/B→4/C po výbere farby nite |

---

## 7. Známe problémy / next-up

### Otvorené body / odporúčania

- **`setTimeout` cleanup pri unmount** — 6+ inline `setTimeout` v onClick handleroch nie sú trackované v `useRef` → `clearTimeout`. Reálny dopad minimálny (`if (el)` guard chráni pred crashom), ale best practice je extraktovať do `useEffect` cleanup. Týka sa scroll volaní na r. ~1235, 1336, 1431, 1583, 2046, 2263.
- **Cognitive overload na r. 1583** (nechcem nášivky branch) — 4 nested setTimeout + 5 setState volaní v jednej linke. Refactor do `handleNasivkyNechcem()` funkcie.
- **Konštanta `ACCORDION_OPEN_DELAY`** — momentálne hodnoty 200/300/450/500ms rozhádzané po kóde. Vytvoriť konštantu na vrchu komponentu.
- **`scrollMarginTop: 20`** je nízke pre mobile — ak fixed header zaberá viac, pridať väčší margin (60-80).
- **Sekcie 02-08 v popise produktu** používajú placeholder gradient — keď budú produktové fotky, priradiť ich.
- **Cennik `cennik_konfigurator.xlsx`** je commitnutý ale obsah som nekontroloval. Ak treba úpravu, pýtať sa Michala.

### Veci, ktoré Michal výslovne **nechcel**

- Žiadne CTA bannery typu "RÝCHLA VOĽBA" / "NAJOBĽÚBENEJŠIA VOĽBA — 93 % ZÁKAZNÍKOV" / "ODPORÚČAME" — všetko klasické karty s diskrétnym `★ Najobľúbenejšie` badgom.
- Žiadne pulzujúce/animované zlaté pozadie (CTA-rychla-volba CSS odstránený).
- Žiadne per-field farebné kódovanie v Step 1 (Model nie červený, prevodovka nie modrá, atď.).
- Žiadne "BUNDLE" v slovenskej UI — používať "ZVÝHODNENÉ".

---

## 8. Pravidlá pre prácu (CLAUDE.md)

Michal má vlastné záväzné pravidlá v `/sessions/.../mnt/uploads/CLAUDE.md`. Hlavné body:

- **Pred každou odpoveďou s tool use:** prejsť všetky relevantné skilly/agenti/MCP, paralelne spustiť 2-5
- **`TaskCreate` POVINNÝ** pre každú úlohu s tool use. Prvý task vždy = "Skontrolovať skilly". Max 1 `in_progress` naraz.
- **Subagenti agresívne** — research (paralelne 2-5), code review (fresh context cez `superpowers:code-reviewer` alebo `comprehensive-review:code-reviewer`)
- **Context7 PRED** každou knižnicou
- **Chrome DevTools MCP** povinný pre UI zmeny pred "hotovo"
- **2+ zdroje** pri faktoch
- **2-3 alternatívy** pri rozhodnutiach (`AskUserQuestion` s 2-4 voľbami)
- **Commit + push po KAŽDEJ úprave**
- **SK tón, tykať, stručne, bullet points**
- **Zakázané buzzwords:** robustné, škálovateľné, cutting-edge, state-of-the-art, enterprise-grade, holistický, synergia, disruptívne

---

## 9. Užitočné príkazy

```bash
# Kontrola syntaxe
node --check konfigurator_compiled.js

# Online náhľad (raw.githack)
# https://raw.githack.com/luxusnerohoze-dev/konfigurator/master/index.html

# Lokálny náhľad
# file:///C:/Users/M/Desktop/claud/konfigurator%20V4/index.html

# Hľadanie textu naprieč súborom (pri exploraci)
grep -n "<pattern>" konfigurator.jsx

# Spočítanie výskytov
grep -c "<pattern>" konfigurator.jsx
```

### Pri väčšom researchi v 3700-riadkovom JSX

Použiť `Explore` subagenta s konkrétnym briefom — vráti čísla riadkov a krátke extrakty bez kontaminácie hlavného kontextu.

---

## 10. Kontakty / spätné info

- Michal komunikuje **slovensky** (tykať, stručne, bullets)
- Email: `luxusnerohoze@gmail.com`
- Pozri pamäťové súbory: `feedback_pravidla_claude_md.md`, `user_michal.md`, `project_konfigurator.md`, `feedback_workspace.md`, `reference_github.md`, `reference_github_token.md`
