import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";

import { Pocket } from "components/PocketList/Pocket";
import { JestEnvironment } from "@jest/environment";

describe("Pocket renders", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");
    const state = {};
    ReactDOM.render(<Pocket state={state} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Renders a pocket info", () => {
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

    const list = mount(<Pocket {...state} />);
    expect(list.text()).toContain("£ 123.12");
    expect(list.text()).toContain("British Pound");
  });
});
