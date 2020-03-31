import React, { useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import ThemeContext from "./ThemeContext";
import { Router } from "@reach/router";

// lazy loading

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const theme = useState("green");

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={theme}>
        <div>
          <h1>Adopt me</h1>
          <Suspense fallback={<h1>loading route …</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id" />
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
