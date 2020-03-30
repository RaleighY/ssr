import { Context } from "koa";

export default async function(ctx: Context, next: any) {
  try {
    await next();

    if (ctx.status == 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.response.status == err.statusCode || err.status || 500;
    if (ctx.status == 404) {
      // ctx.redirect("/");
    }
    ctx.response.body = {
      code: err.statusCode,
      message: err.message
    };
    ctx.app.emit("error", err, ctx);
  }
}
