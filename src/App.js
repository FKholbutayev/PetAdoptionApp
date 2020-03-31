import React from "react";
import ReactDOM from "react-dom";
import SearchParams from "./SearchParams";

import Details from "./Details";
import { Router } from "@reach/router";

const App = () => {
  return (
    <div>
      <h1>Adopt me</h1>
      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
