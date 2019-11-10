import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";

import { Rates } from "components/Rates/Rates";
import expectExport from "expect";

describe("Rates renders", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");
    const state = {};
    // not checking calls, just atomic test to check that it works at it's most basic
    // TODO: should component render without any props ?
    ReactDOM.render(<Rates state onFetchRates={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(true).toBeTruthy();
  });

  jest.useFakeTimers();
  it("It fetches rates", () => {
    const state = {};

    const onFetchRatesMock = jest.fn();

    const ratesWrapper = mount(
      <Rates state onFetchRates={onFetchRatesMock} timer={1000} />
    );
    expect(onFetchRatesMock).toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(ratesWrapper.text()).toContain("No selectedPocketRates");
  });

  it("It fetches rates", () => {
    const state = {
      selectedPocketRates: {}
    };

    const onFetchRatesMock = jest.fn();

    const ratesWrapper = mount(
      <Rates state onFetchRates={onFetchRatesMock} timer={1000} />
    );
    const ratesTitle = ratesWrapper.find("h1");
    console.log(ratesTitle);
    expect(ratesTitle).toHaveLength(1);
    expect(ratesTitle.text()).toBe("Rates");
  });
});
