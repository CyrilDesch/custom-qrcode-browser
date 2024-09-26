import GCompiler from "google-closure-compiler";
const { compiler: closureCompiler } = GCompiler;
import { Command } from "commander";
import fs from "fs";

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
let jsFile = `${distPath}/index.js`;

// Configuration du compilateur Closure avec les fichiers et options dynamiques
const compiler = new closureCompiler({
  js: jsFile,
  language_in: "ECMASCRIPT_2021",
  language_out: "ECMASCRIPT_2021",
  compilation_level: "ADVANCED_OPTIMIZATIONS",
  entry_point: jsFile,
  js_output_file: `${distPath}/index.min.js`,
  rewrite_polyfills: false,
  create_source_map: "%outname%.map",
  warning_level: "QUIET",
  process_common_js_modules: true,
  dependency_mode: "PRUNE",
  module_resolution: "NODE",
  jscomp_off: "*", // To ignore react and angular lib
});

// Exécution de la compilation
compiler.run((exitCode, _stdout, stderr) => {
  if (exitCode === 0) {
    // Remove source file js entry_point from dist folder

    fs.unlink(jsFile, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`${jsFile} was deleted`);
    });

    console.log("Build successful.");
  } else {
    console.error(stderr);
  }
});
