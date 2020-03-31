import React, { useState } from "react";
import ReactDOM from "react-dom";
import SearchParams from "./SearchParams";
import ThemeContext from "./ThemeContext";

import Details from "./Details";
import { Router } from "@reach/router";

const App = () => {
  const theme = useState("green");

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={theme}>
        <div>
          <h1>Adopt me</h1>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
