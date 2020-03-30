import * as React from "react";
import { Link } from "react-router-dom";

import { Test, Container } from "./style";

function Home() {
  return (
    <Container>
      <Test>12312</Test>
      <p>
        <Link to="/about">go to about !!</Link>
      </p>
      <p>
        <Link to="/doc">go to doc.</Link>
      </p>
    </Container>
  );
}

export default Home;
