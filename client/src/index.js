import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

import Signout from "./components/auth/Signout";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import User from "./components/user/User";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile/:slug" component={User} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
