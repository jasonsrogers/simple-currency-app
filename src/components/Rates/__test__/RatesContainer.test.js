import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import RatesContainer from "components/Rates/RatesContainer";
import { Rates } from "components/Rates/Rates";
import reducer from "reducers/reducer";

import * as service from "service/ratesService";

// TODO check if to use this: import configureMockStore from "redux-mock-store";
const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
    // loggerMiddleware // neat middleware that logs actions
  )
);

describe("Rates Container renders", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");

    const spy = jest.spyOn(service, "getRates");

    ReactDOM.render(
      <Provider store={store}>
        <RatesContainer />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);

    spy.mockRestore();
  });
  it("Renders a Rates component", () => {
    const spy = jest.spyOn(service, "getRates");
    const container = mount(
      <Provider store={store}>
        <RatesContainer />
      </Provider>
    );
    expect(container.find(Rates)).toBeTruthy();
    // check that it renders one of the default pockets
    expect(container.text()).toContain("Rates");

    spy.mockRestore();
  });
});
