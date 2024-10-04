import typescript from "rollup-plugin-typescript2";
import packageJSON from "./package.json" assert { type: "json" };
import terser from "@rollup/plugin-terser";

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * ${packageJSON.name}
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

export default {
  input: "./src/index.ts",
  output: [
    createOutputOptions({
      file: `./lib/index.mjs`,
      format: "es",
    }),
  ],
  plugins: [
    terser(),
    typescript({
      tsconfig: `./tsconfig.bundle.json`,
      useTsconfigDeclarationDir: true,
      sourceMap: true,
    }),
  ],
};
