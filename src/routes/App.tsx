import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Normalize } from "@src/common/NormalizeCss";

import Home from "@routes/Home";
import About from "@routes/About";
import Doc from "@routes/Doc";

class App extends React.Component {
  render() {
    return (
      <>
        <Normalize />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/doc" component={Doc} />
        </Switch>
      </>
    );
  }
}

export default App;
