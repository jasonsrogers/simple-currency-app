import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import { History } from "components/History/History";
import reducer from "reducers/reducer";

// TODO check if to use this: import configureMockStore from "redux-mock-store";
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
    // loggerMiddleware // neat middleware that logs actions
  )
);

describe("History Container renders", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <Provider store={store}>
        <History />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Renders a History component", () => {
    const container = mount(
      <Provider store={store}>
        <History />
      </Provider>
    );
    expect(container.find(History)).toBeTruthy();
    // check that it renders one of the default pockets
    expect(container.text()).toContain("History");
  });
});
