import { MuiThemeProvider } from "material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import Layout from "./components/layout";
import "./index.css";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <HashRouter>
        <Layout />
      </HashRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
