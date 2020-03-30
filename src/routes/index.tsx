import * as React from "react";
import { StaticRouter, BrowserRouter } from "react-router-dom";

import App from "@routes/App";

export function ClientApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export function ServerApp(props: { context: any; url: string }) {
  return (
    <StaticRouter context={props.context} location={props.url}>
      <App />
    </StaticRouter>
  );
}
