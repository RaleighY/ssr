const webpack = require("webpack");
const config = require("../config/client/webpack.config.js");

const compiler = webpack(config);

try {
  compiler.run();
} catch (err) {
  if (err && err.message) {
    console.log(err.message);
  }
}
