require("../polyfill");

import * as Koa from "koa";
import * as path from "path";
import * as serve from "koa-static";
import * as fs from "fs";

import router from "@server/router";
import error from "@middleware/error";

const app = new Koa();

// 处理错误
app.use(error);

// 日志
app.on("error", (err, ctx) => {
  console.log(`err (${err.message}): `, err);
  console.log(`ctx: `, ctx);
});

// 挂载路由
app.use(router.routes());

// 静态文件目录
app.use(serve(path.join(fs.realpathSync(process.cwd()), "build/client")));
app.use(serve(path.join(fs.realpathSync(process.cwd()), "asserts")));

// 开启监听
app.listen(8080);
console.log("Server running on port 8080");
