import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("app")
);
