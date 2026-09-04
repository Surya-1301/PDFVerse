const fs = require("fs");
const src = fs.readFileSync("pdf-backend/server.js", "utf8");

const callRegex = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
const defRegex =
  /(?:function\s+([a-zA-Z_][a-zA-Z0-9_]*)|(?:const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:async\s*)?(?:function|\())/g;

const called = new Set();
const defined = new Set();
let m;

while ((m = callRegex.exec(src))) called.add(m[1]);
while ((m = defRegex.exec(src))) {
  if (m[1]) defined.add(m[1]);
  if (m[2]) defined.add(m[2]);
}

const globals = new Set([
  "if","for","while","switch","catch","function","return","typeof","new","delete",
  "in","of","require","console","process","Math","JSON","Object","Array","String",
  "Number","Boolean","Date","Promise","path","fs","fsp","os","crypto","execFile",
  "app","req","res","next","error","err","Buffer","setTimeout","setInterval",
  "clearTimeout","clearInterval","module","exports","URL","URLSearchParams","fetch",
  "AbortController","FormData","Blob","TextEncoder","TextDecoder","stream",
  "parseInt","parseFloat","isNaN","isFinite","undefined","null","true","false",
  "async","await","throw","try","finally","else","do","var","let","const","void",
  "this","arguments","processFiles","uploadedFiles","outputDir","batchUpload","upload"
]);

const missing = [...called]
  .filter((f) => !defined.has(f) && !globals.has(f) && /[a-z]/.test(f[0]) && f.length > 2)
  .sort();

console.log("Potentially missing functions:");
console.log(missing.join("\n"));