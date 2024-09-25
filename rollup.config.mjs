// @ts-check
import typescript from "rollup-plugin-typescript2";
import packageJSON from "./package.json" assert { type: "json" };
import terser from "@rollup/plugin-terser";

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * ${packageJSON.name} v${packageJSON.version}
 * (c) ${packageJSON.author.name}
 * Released under the ${packageJSON.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options) {
  return {
    banner,
    name: "[CustomQrCodeBrowser]",
    exports: "named",
    sourcemap: false,
    ...options,
  };
}

/**
 * Configuration de base pour Rollup.
 * @param {string} input - Le fichier d'entrée du bundle.
 * @param {string} outputDir - Le répertoire de sortie pour le bundle.
 * @param {string[]} externalDeps - Les dépendances externes.
 * @returns {Object} - Configuration pour Rollup.
 */
const baseConfig = (input, outputDir, externalDeps, framework) => ({
  input,
  output: [
    createOutputOptions({
      file: `./${outputDir}/index.js`,
      format: "es",
    }),
  ],
  external: externalDeps,
  plugins: [
    typescript({
      tsconfig: `./${framework}/tsconfig.bundle.json`,
    }),
  ],
});

export default baseConfig;
