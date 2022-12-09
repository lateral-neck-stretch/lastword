import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <Router history={history}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);
