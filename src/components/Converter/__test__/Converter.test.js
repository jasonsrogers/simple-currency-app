import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import { Converter } from "components/Converter/Converter";
import { ConversionForm } from "components/Converter/ConversionForm";
import { BrowserRouter as Router } from "react-router-dom";
const basicState = {
  selectedPocketRates: {},
  selectedFromPocketCurrency: "EUR",
  selectedToPocketCurrency: "USD",
  pockets: {}
};

describe("Converter: component renders correctly", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");

    // not checking calls, just atomic test to check that it works at it's most basic
    // TODO: should component render without any props ?
    ReactDOM.render(
      <Router>
        <Converter state={basicState} />
      </Router>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
    expect(true).toBeTruthy();
  });

  it("Displays Pocket Form", () => {
    const converterWrapper = mount(
      <Router>
        <Converter state={basicState} />
      </Router>
    );
    expect(converterWrapper.find("h1").text()).toBe("Converter");
    expect(converterWrapper.find(ConversionForm)).toBeTruthy();
  });
});
