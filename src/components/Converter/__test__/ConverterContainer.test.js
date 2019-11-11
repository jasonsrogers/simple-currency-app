import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import ConverterContainer from "components/Converter/ConverterContainer";
import { Converter } from "components/Converter/Converter";
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

describe("Converter Container renders", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");

    const spy = jest.spyOn(service, "getRates");

    ReactDOM.render(
      <Provider store={store}>
        <ConverterContainer />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);

    spy.mockRestore();
  });
  it("Renders a Converter component", () => {
    const spy = jest.spyOn(service, "getRates");
    const container = mount(
      <Provider store={store}>
        <ConverterContainer />
      </Provider>
    );
    expect(container.find(Converter)).toBeTruthy();
    // check that it renders one of the default pockets
    expect(container.text()).toContain("Converter");

    spy.mockRestore();
  });

  // TODO: add a test that shows state affects component
});
