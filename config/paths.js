const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  asserts: resolveApp("asserts"),
  clientEntry: resolveApp("src/client.tsx"),
  clientOutput: resolveApp("build/client"),
  serverEntry: resolveApp("src/server"),
  serverOutput: resolveApp("build/server")
};
