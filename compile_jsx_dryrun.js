// DRY RUN - len skompiluje a ulozi do _test suborov
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const ROOT = __dirname;
const JSX_FILE = path.join(ROOT, "konfigurator.jsx");
const OUT_FILE = path.join(ROOT, "_compiled_test.js");

console.log("→ Citam konfigurator.jsx (", fs.statSync(JSX_FILE).size, "B )");
const jsxSource = fs.readFileSync(JSX_FILE, "utf8");

console.time("  babel compile");
const result = babel.transformSync(jsxSource, {
  presets: ["@babel/preset-react"],
  compact: true,
  comments: false,
  babelrc: false,
  configFile: false,
});
console.timeEnd("  babel compile");

fs.writeFileSync(OUT_FILE, result.code, "utf8");
console.log("✓ vystup:", fs.statSync(OUT_FILE).size, "B →", OUT_FILE);
console.log("  prvych 500 znakov:");
console.log("  " + result.code.slice(0, 500));
