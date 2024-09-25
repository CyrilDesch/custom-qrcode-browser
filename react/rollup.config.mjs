import baseConfig from "../rollup.config.mjs";

export default baseConfig("./src/index.ts", "./dist", ["react"], "react");
