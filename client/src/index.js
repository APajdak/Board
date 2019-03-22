import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./components/App";
import reducers from "./reducers";

import Signout from "./components/auth/Signout";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";

const store = createStore(reducers, {});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/signin" component={Signin} />
        <Route path="/singout" component={Signout} />
        <Route path="/signup" component={Signup} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
