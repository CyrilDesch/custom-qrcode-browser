import GCompiler from "google-closure-compiler";
const { compiler: closureCompiler } = GCompiler;
import { gzipSync } from "zlib";
import { readFileSync, writeFileSync, statSync } from "fs";
import { join } from "path";
import filesize from "filesize";
import { Command } from "commander";

const program = new Command();

// Configuration de commander pour accepter une option "framework" en CLI
program
  .option("-f, --framework <type>", "Le framework utilisé (angular ou react)")
  .parse(process.argv);

// Récupération des options passées en CLI
const options = program.opts();

if (!["angular", "react"].includes(options.framework)) {
  console.error("Framework inconnu. Veuillez utiliser 'angular' ou 'react'.");
  process.exit(1);
}

const distPath = `${options.framework}/dist`;

// Gestion des fichiers en fonction du framework choisi
let files = [];
if (options.framework === "angular") {
  files.push("node_modules/@angular/core/fesm2022/core.mjs");
} else if (options.framework === "react") {
  files = [
    "node_modules/react/umd/react.development.js",
    "node_modules/react-dom/umd/react-dom.development.js",
  ];
}
files.push(`${distPath}/index.js`);

// Configuration du compilateur Closure avec les fichiers et options dynamiques
const compiler = new closureCompiler({
  js: files,
  language_in: "ECMASCRIPT_2021",
  language_out: "ECMASCRIPT_2021",
  compilation_level: "ADVANCED_OPTIMIZATIONS",
  entry_point: `${distPath}/index.js`,
  js_output_file: `${distPath}/index.min.js`,
  create_source_map: "%outname%.map",
  rewrite_polyfills: false,
  warning_level: "QUIET",
  js_module_root: "node_modules",
  process_common_js_modules: true,
  module_resolution: "NODE",
});

// Exécution de la compilation
compiler.run((exitCode, _stdout, stderr) => {
  if (exitCode === 0) {
    let srcFile = join(__dirname, `dist/bundle.${options.framework}.js`);
    let gzipDest = join(__dirname, `dist/bundle.${options.framework}.js.gz`);
    let srcCode = readFileSync(srcFile);
    writeFileSync(gzipDest, gzipSync(srcCode, { level: 9 }));

    let jsSize = filesize(statSync(srcFile).size);
    let gzipSize = filesize(statSync(gzipDest).size);

    console.log(
      `bundle.${options.framework}.js (${jsSize}) -> bundle.${options.framework}.js.gz (${gzipSize})`,
    );
    console.log("Build successful.");
  } else {
    console.error(stderr);
  }
});
