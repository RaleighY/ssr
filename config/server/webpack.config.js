const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// ts的调试styled-components的插件
const styledComponentsTransformer = require("typescript-plugin-styled-components").default();

const paths = require("../paths");
const env = require("../env");

module.exports = {
  target: "node",
  mode: env.NODE_ENV,
  name: "server",
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        /*configFile: "./path/to/tsconfig.json" */
      })
    ],
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  entry: paths.serverEntry,
  output: {
    path: paths.serverOutput,
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules\/)/,
        use: {
          loader: "ts-loader",
          options: {
            getCustomTransformers: () => ({
              before: [styledComponentsTransformer]
            })
          }
        }
      }
    ]
  },
  plugins: [env.isEnvProduction ? new CleanWebpackPlugin() : {}],
  node: {
    fs: "empty",
    net: "empty"
  }
};
