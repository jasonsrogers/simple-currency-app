import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
// import { createLogger } from "redux-logger";

import reducer from "./reducers/reducer";
import { fetchRates } from "./actions/actions";
import { startPolling } from "service/ratesService";

// const loggerMiddleware = createLogger()
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
    // loggerMiddleware // neat middleware that logs actions
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// store.dispatch(fetchRates("USD")).then(() => console.log(store.getState()));
// store.dispatch(startPolling());
// setInterva l(() => {
//     console.log("polling");
//     store.dispatch(fetchRates("USD")).then(() => console.log(store.getState()));
//   }, 10000);
