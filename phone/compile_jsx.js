// compile_jsx.js — konfigurator.jsx → konfigurator_compiled.js
// Potom vlozi kompilovany kod do index.html aj konfigurator_preview.html
// Spustenie: node compile_jsx.js

const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const ROOT = __dirname;
const JSX_FILE = path.join(ROOT, "konfigurator.jsx");
const COMPILED_FILE = path.join(ROOT, "konfigurator_compiled.js");
const INDEX_FILE = path.join(ROOT, "index.html");
const PREVIEW_FILE = path.join(ROOT, "konfigurator_preview.html");

// Markery v HTML subore, medzi ktorymi je skompilovany konfig kod
// Pouzijeme koniec react-dom skriptu a zaciatok render volania ako kotvy
const RENDER_LINE = 'const root = ReactDOM.createRoot(document.getElementById("root"));';

console.log("→ Citam konfigurator.jsx ...");
const jsxSource = fs.readFileSync(JSX_FILE, "utf8");

console.log("→ Kompilujem JSX cez @babel/core (react preset, compact) ...");
const result = babel.transformSync(jsxSource, {
  presets: [
    "@babel/preset-react", // JSX -> React.createElement, ES6+ zostava
  ],
  compact: true,
  comments: false,
  babelrc: false,
  configFile: false,
});

if (!result || !result.code) {
  console.error("CHYBA: babel nevratil kod");
  process.exit(1);
}

const compiled = result.code;

console.log("→ Zapisujem konfigurator_compiled.js ...");
fs.writeFileSync(COMPILED_FILE, compiled, "utf8");

// Teraz aktualizujeme index.html a konfigurator_preview.html
// Predpoklad: existujuci HTML ma blok:
// <script>/** react */ ... </script>
// <script>/** react-dom */ ... </script>
// <script>
//  <KOD KONFIGURATORA>
//  const root = ReactDOM.createRoot(document.getElementById("root"));
//  root.render(React.createElement(Configurator));
// </script>
// </body></html>

function patchHtml(htmlPath) {
  console.log(`→ Aktualizujem ${path.basename(htmlPath)} ...`);
  const html = fs.readFileSync(htmlPath, "utf8");

  // Najdeme posledny <script> tag pred RENDER_LINE
  const renderIdx = html.indexOf(RENDER_LINE);
  if (renderIdx === -1) {
    console.error(`  CHYBA: nenasiel som '${RENDER_LINE}' v ${htmlPath}`);
    return false;
  }

  // Najdi zaciatok script tagu, ktory obsahuje RENDER_LINE
  const scriptOpenIdx = html.lastIndexOf("<script>", renderIdx);
  const scriptCloseIdx = html.indexOf("</script>", renderIdx);
  if (scriptOpenIdx === -1 || scriptCloseIdx === -1) {
    console.error(`  CHYBA: nenasiel som <script>...</script> obal v ${htmlPath}`);
    return false;
  }

  const before = html.slice(0, scriptOpenIdx);
  const after = html.slice(scriptCloseIdx + "</script>".length);

  const newScript =
    "<script>" +
    compiled +
    "\n" +
    RENDER_LINE +
    "\n" +
    'root.render(React.createElement(Configurator));' +
    "\n" +
    "</script>";

  fs.writeFileSync(htmlPath, before + newScript + after, "utf8");
  return true;
}

const okIndex = patchHtml(INDEX_FILE);
const okPreview = patchHtml(PREVIEW_FILE);

if (okIndex && okPreview) {
  console.log("✓ HOTOVO - vsetky 3 cielove subory aktualizovane");
} else {
  console.log("✗ NIEKTORE SUBORY SA NEPODARILO AKTUALIZOVAT - skontroluj manualne");
  process.exit(1);
}
