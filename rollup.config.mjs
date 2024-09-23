// @ts-check
import typescript2 from "rollup-plugin-typescript2";
import packageJSON from "./package.json" assert { type: "json" };

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
    sourcemap: true,
    ...options,
  };
}

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: "./src/index.ts",
  output: [
    createOutputOptions({
      file: "${outputDir}/dist/index.js",
      format: "commonjs",
    }),
    createOutputOptions({
      file: "./${outputDir}/dist/index.cjs",
      format: "commonjs",
    }),
    createOutputOptions({
      file: "./${outputDir}/dist/index.mjs",
      format: "esm",
    }),
    createOutputOptions({
      file: "./${outputDir}/dist/index.esm.js",
      format: "esm",
    }),
  ],
  plugins: [
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: "./tsconfig.bundle.json",
    }),
  ],
};

export default options;
