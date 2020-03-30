require("@babel/polyfill");

if (process.env.NODE_ENV !== "production") {
  // 使node环境下可以require对应的extension文件
  // babel-plugin-transform-require-ignore 只能忽略
  require("css-modules-require-hook")({
    generateScopedName: "[name]__[local]___[hash:base64:5]",
    extensions: [".css", ".scss"]
  });

  // 使node环境下可以用tsconfig.json中的paths
  const tsConfigPaths = require("tsconfig-paths");
  const tsConfig = require("./tsconfig.json");
  tsConfigPaths.register({
    baseUrl: "./",
    paths: tsConfig.compilerOptions.paths
  });
}
