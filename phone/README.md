# Mobile verzia konfigurátora

UI prispôsobené pre telefón. Pravidlá, ceny, validácie a CONFIG sú **identické s PC verziou** v koreni repa.

## URL

- **Live (cez raw.githack):** https://raw.githack.com/luxusnerohoze-dev/konfigurator/master/phone/index.html
- **Lokálne:** otvor `index.html` v prehliadači (alebo `file:///C:/Users/M/Desktop/claud/konfigurator V4/phone/index.html`)

## Build

```bash
node compile_jsx.js
```

Spustí Babel kompiláciu `konfigurator.jsx` a aktualizuje `index.html`, `konfigurator_preview.html`, `konfigurator_compiled.js`.

`@babel/core` sa rezolvuje z `../node_modules/` (parent), nemusíš spúšťať `npm install` v tomto subfolderi.

## Hlavné mobile-špecifické UI rozdiely vs PC

- **Single-column layout** (`flex-direction: column` vždy, nie media query)
- **Container max-width 480px**, padding `12px 12px 92px 12px` (92px dole pre sticky bar)
- **Kompaktnejší header** (LCD 10px, h1 18px, h2 12px)
- **Galéria 16:10** s tap-friendly šípkami (44px) a bullet indicator pozície
- **Akordeóny** plnej šírky, `minHeight: 48` (Apple HIG tap target)
- **Dropdowny** padding 14×44, fontSize 15
- **Sticky bottom bar** (`position: fixed`) — CELKOM cena + "🛒 Do košíka" tlačidlo prilepené dole; klik nájde a auto-klikne hlavné tlačidlo
- **`viewport-fit=cover`** + `theme-color #C5A44E` + `apple-mobile-web-app-capable`

## Sync s PC verziou

⚠️ **Každú zmenu v pravidlách (CONFIG, PRICES, validácie) treba dať do oboch:**

- `../konfigurator.jsx` (PC)
- `./konfigurator.jsx` (Mobile)

Po edite oboch spustiť oba `compile_jsx.js`.

Ak je zmena len v UI a má zmysel iba na PC alebo iba na mobile, daj ju iba do toho variantu.
