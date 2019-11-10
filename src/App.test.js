import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import App from "./App";
import reducer from "./reducers/reducer";

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
    // loggerMiddleware // neat middleware that logs actions
  )
);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
