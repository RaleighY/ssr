import * as React from "react";
import * as Koa from "koa";
import * as fs from "fs";
import * as path from "path";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

import { ServerApp } from "@routes/index";

export default function(ctx: Koa.Context) {
  let html = fs.readFileSync(
    path.resolve(process.cwd(), "asserts/index.html"),
    "utf8"
  );

  const sheet = new ServerStyleSheet();

  const app = renderToString(
    sheet.collectStyles(<ServerApp url={ctx.request.url} context={{}} />)
  );

  const styles = sheet.getStyleTags();

  ctx.body = html
    .replace("%REACT-APP%", app)
    .replace("<!-- %STYLED-COMPONENTS% -->", styles)
    .replace("%SCRIPTS%", getScripts());
}

function getScripts() {
  try {
    let files = fs.readdirSync(
      path.resolve(process.cwd(), "build/client/static/js"),
      "utf8"
    );

    let s = "";
    files.forEach(
      (file: string) => (s += `<script src='/static/js/${file}'></script>`)
    );

    return s;
  } catch (err) {
    return "";
  }
}
