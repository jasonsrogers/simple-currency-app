import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import { Converter } from "components/Converter/Converter";
import { ConversionForm } from "components/Converter/ConversionForm";

const basicState = {
  selectedPocketRates: {},
  selectedFromPocketCurrency: "EUR",
  selectedToPocketCurrency: "USD",
  pockets: {}
};

const fullState = {
  ...basicState,
  selectedPocketRates: {
    error: undefined,
    isLoading: false,
    selectedRateInfo: {
      base: "EUR",
      date: "2019-11-11",
      rates: {
        EUR: 1,
        USD: 1.5,
        GBP: 0.9
      }
    }
  },
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
const partialState = {
  ...basicState,
  selectedToPocketCurrency: "",
  selectedPocketRates: {
    error: undefined,
    isLoading: false,
    selectedRateInfo: {
      base: "EUR",
      date: "2019-11-11",
      rates: {
        EUR: 1.7035793009,
        USD: 1.5,
        GBP: 160.5962002729
      }
    }
  },
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

describe("Converter: component renders correctly", () => {
  it("Sanity check", () => {
    const div = document.createElement("div");

    // not checking calls, just atomic test to check that it works at it's most basic
    // TODO: should component render without any props ?
    ReactDOM.render(<Converter state={basicState} />, div);
    ReactDOM.unmountComponentAtNode(div);
    expect(true).toBeTruthy();
  });

  it("Displays Pocket Form", () => {
    const converterWrapper = mount(<Converter state={basicState} />);
    expect(converterWrapper.find("h1").text()).toBe("Converter");
    expect(converterWrapper.find(ConversionForm)).toBeTruthy();
  });
});
