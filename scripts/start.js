const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../config/client/webpack.config.js");
const paths = require("../config/paths");

const compiler = webpack(config);

try {
  const devServer = new WebpackDevServer(compiler, {
    contentBase: paths.asserts,
    port: 8081,
    historyApiFallback: {
      disableDotRule: true
    },
    // hot: true,
    inline: true
  });
  devServer.listen(8081);
} catch (err) {
  if (err && err.message) {
    console.log(err.message);
  }
  process.exit(1);
}
