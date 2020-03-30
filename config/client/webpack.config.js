const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// ts的调试styled-components的插件
const styledComponentsTransformer = require("typescript-plugin-styled-components").default();

const paths = require("../paths");
const env = require("../env");

module.exports = {
  mode: env.NODE_ENV,
  name: "client",
  entry: {
    main: paths.clientEntry
  },
  output: {
    publicPath: "/",
    path: paths.clientOutput,
    // filename: "static/js/[name].[chunkhash:8].js",
    // chunkFilename: "static/js/[name].[chunkhash:8].chunk.js"
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js"
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
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
          },
          {
            loader: "file-loader",
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        /*configFile: "./path/to/tsconfig.json" */
      })
    ],
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendors",
      cacheGroups: {
        "vendor-react": {
          test: /react/,
          chunks: "all",
          name: "vendor-react",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {
          inject: true,
          template: "asserts/index.html"
        },
        env.isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
              }
            }
          : undefined
      )
    ),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env),
    new webpack.DefinePlugin(env.stringify),
    new CopyPlugin([
      { from: paths.asserts, to: paths.clientOutput, ignore: ["index.html"] }
    ]),
    env.isEnvProduction && new CleanWebpackPlugin()
  ].filter(Boolean)
  // devtool: "source-map",
};
