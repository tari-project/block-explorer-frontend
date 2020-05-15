import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
function render(AppComponent: () => JSX.Element) {
  ReactDOM.render(
    <React.StrictMode>
      <AppComponent />
    </React.StrictMode>,
    rootElement
  );
}

render(App);

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}
