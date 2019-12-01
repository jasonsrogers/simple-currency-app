import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";

import { Pocket } from "components/PocketList/Pocket";
import { BrowserRouter as Router } from "react-router-dom";

describe("Pocket renders", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");
    const state = {};
    ReactDOM.render(<Pocket state={state} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Renders a not selected pocket info", () => {
    const mockOnSelectPocket = jest.fn();
    const state = {
      pocket: {
        code: "GBP",
        amount: 123.12,
        symbol: "£",
        description: "British Pound"
      },
      onSelectPocket: mockOnSelectPocket,
      isPocketSelected: false
    };

    const pocket = mount(<Pocket {...state} />);
    expect(pocket.text()).toContain("£ 123.12");
    expect(pocket.text()).toContain("British Pound");
    expect(pocket.text()).toContain("Select");
  });
  it("Renders a selected pocket info", () => {
    const mockOnSelectPocket = jest.fn();
    const state = {
      pocket: {
        code: "GBP",
        amount: 123.12,
        symbol: "£",
        description: "British Pound"
      },
      onSelectPocket: mockOnSelectPocket,
      isPocketSelected: true
    };

    const pocket = mount(
      <Router>
        <Pocket {...state} />
      </Router>
    );
    expect(pocket.text()).toContain("£ 123.12");
    expect(pocket.text()).toContain("British Pound");
    expect(pocket.text()).toContain("Top Up");
    expect(pocket.text()).toContain("Exchange");
    expect(pocket.text()).toContain("Bank");

    const exchangeLink = pocket.find("Link.pocket__exchange");
    exchangeLink.simulate("click");
    // expect(mockOnSelectPocket).toBeCalled();
    // expect(location.pathname).toBe("/products");
  });
});
