import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";

import { Rates } from "components/Rates/Rates";

describe("Rates renders", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");
    const state = {};
    // not checking calls, just atomic test to check that it works at it's most basic
    // TODO: should component render without any props ?
    ReactDOM.render(<Rates state={state} onFetchRates={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(true).toBeTruthy();
  });

  jest.useFakeTimers();
  it("It fetches rates", () => {
    const state = {};

    const onFetchRatesMock = jest.fn();

    const ratesWrapper = mount(
      <Rates state={state} onFetchRates={onFetchRatesMock} timer={1000} />
    );
    expect(onFetchRatesMock).toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(ratesWrapper.text()).toContain("No selectedPocketRates");
  });

  it("It fetches rates", () => {
    const state = {
      selectedPocketRates: {
        selectedRateInfo: {
          rates: {
            CAD: 1.3196483596,
            GBP: 0.7808410368,
            JPY: 109.4072865688,
            THB: 30.3851731013,
            CHF: 0.9961029545,
            EUR: 0.9062896502,
            USD: 1.0
          },
          base: "USD",
          date: "2019-11-08"
        }
      }
    };

    const onFetchRatesMock = jest.fn();

    const ratesWrapper = mount(
      <Rates state={state} onFetchRates={onFetchRatesMock} timer={1000} />
    );
    const ratesTitle = ratesWrapper.find("h1");
    expect(ratesTitle).toHaveLength(1);
    expect(ratesTitle.text()).toBe("Rates:");
    expect(ratesWrapper.text()).toContain("Base: USD");
    expect(ratesWrapper.find(".rates__base").text()).toBe("Base: USD");
    expect(ratesWrapper.find(".rates__date").text()).toBe("Date: 2019-11-08");
    expect(ratesWrapper.find(".rates__rate")).toHaveLength(7);
    expect(ratesWrapper.find(".rates__list").text()).toContain(
      "EUR: 0.9062896502"
    );
  });
});
