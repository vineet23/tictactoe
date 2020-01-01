import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import Home from "./components/Home";

//created store
const store = createStore(rootReducer);

store.subscribe(() => console.log("store", store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

//set HTTPS=true&&npm start

//for the camera

// For folks waiting react-sripts for a patch you can manually edit

// node_modules/react-dev-utils/webpackHotDevClient.js
// Here's the code you'll want at line 62 of that file:

// protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',
// Hope this answer helps you get rid of the error.
