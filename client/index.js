import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import { StylesProvider } from "@material-ui/core/styles";

ReactDOM.render(
  <StylesProvider injectFirst>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </StylesProvider>,
  document.getElementById("app")
);
