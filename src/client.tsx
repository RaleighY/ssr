import * as React from "react";
import * as ReactDOM from "react-dom";

import { ClientApp } from "@routes/index";

(process.env.NODE_ENV ? ReactDOM.render : ReactDOM.hydrate)(
  <ClientApp />,
  document.getElementById("root")
);
