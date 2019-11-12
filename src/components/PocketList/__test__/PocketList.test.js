import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import { PocketList } from "components/PocketList/PocketList";
import { Pocket } from "components/PocketList/Pocket";

describe("Pocket list renders", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");
    const state = {};
    ReactDOM.render(<PocketList state={state} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("Renders an empty list message", () => {
    const state = {};
    const list = mount(<PocketList state={state} />);
    expect(list.text()).toContain("No pockets configured");
  });
  it("Renders a pocket", () => {
    const state = {
      pockets: {
        GBP: {
          code: "GBP",
          amount: 123.12,
          symbol: "£",
          description: "British Pound"
        }
      }
    };
    const list = mount(<PocketList state={state} />);
    expect(list.text()).toContain("£");
  });

  it("Renders 3 pockets", () => {
    const state = {
      pockets: {
        GBP: {
          code: "GBP",
          amount: 123.12,
          symbol: "£",
          description: "British Pound"
        },
        EUR: {
          code: "EUR",
          amount: 234.23,
          symbol: "€",
          description: "Euro"
        },
        USD: {
          code: "USD",
          amount: 50.0,
          symbol: "$",
          description: "American Dollar"
        }
      }
    };
    const list = mount(<PocketList state={state} />);
    expect(list.find(Pocket).length).toBe(3);
  });
});
