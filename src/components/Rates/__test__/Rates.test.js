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
    ReactDOM.render(<Rates state onFetchRates={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(true).toBeTruthy();
  });

  it("It fetches rates", () => {
    const state = {};

    const onFetchRatesMock = jest.fn();

    const list = mount(<Rates state onFetchRates={onFetchRatesMock} />);
    expect(onFetchRatesMock).toHaveBeenCalled();
    // TODO check that timeout is working
    // setTimeout(() => {
    //   expect(onFetchRatesMock.mock.calls.length).toBeGreaterThan(1);
    // }, 1000);
  });
});
