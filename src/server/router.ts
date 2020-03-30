import * as KoaRouter from "koa-router";

import ssr from "@controller/ssr";

export default new KoaRouter()
  .get("/", ssr)
  .get("/about", ssr)
  .get("/doc", ssr);
