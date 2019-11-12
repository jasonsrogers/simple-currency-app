import { mount } from "enzyme";
import React from "react";
import ReactDOM from "react-dom";

import { Converter, ConversionForm } from "components/Converter/Converter";

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

  it("Displays No pocket selected yet", () => {
    const converterWrapper = mount(<Converter state={basicState} />);
    expect(converterWrapper.find("h1").text()).toBe("Converter");
    expect(converterWrapper.find(ConversionForm)).toBeTruthy();
    expect(converterWrapper.find(ConversionForm).text()).toContain(
      "No pocket selected yet"
    );
    expect(
      converterWrapper.find(".conversion-form__exchange").exists()
    ).toBeFalsy();
  });
  it("Displays conversion form/to", async () => {
    const converterWrapper = mount(<Converter state={fullState} />);
    const text = await converterWrapper.text();
    expect(text).toContain("From Value EUR");
    expect(text).toContain("To Value USD");
    expect(text).toContain("Current rate: 1.5");

    expect(
      converterWrapper.find(".conversion-form__exchange").exists()
    ).toBeTruthy();
  });
  it("Displays conversion from (awaiting the selection of a to)", async () => {
    const converterWrapper = mount(<Converter state={fullState} />);
    const text = await converterWrapper.text();
    expect(text).toContain("From Value EUR");
    expect(text).toContain("To Value USD");
    expect(text).toContain("Current rate: 1.5");
    expect(
      converterWrapper.find(".conversion-form__switch-currency")
    ).toHaveLength(1);
  });
  it("Displays conversion form", async () => {
    const converterWrapper = mount(<Converter state={partialState} />);
    const text = await converterWrapper.text();
    expect(text).toContain("From Value EUR");
    expect(text).toContain("To Value");
    expect(text).toContain("Current rate:");
    expect(
      converterWrapper.find(".conversion-form__switch-currency")
    ).toHaveLength(2);
  });
});

describe("Converter: component inputs/buttons", () => {
  it("Should trigger select pocket callback", () => {
    const mockOnSelectToPocket = jest.fn();
    const converterWrapper = mount(
      <Converter state={fullState} onSelectToPocket={mockOnSelectToPocket} />
    );

    const button = converterWrapper.find(".conversion-form__switch-currency");
    expect(button).toHaveLength(1);
    button.simulate("click");
    expect(mockOnSelectToPocket).toHaveBeenCalledWith("GBP");
  });

  it("Should trigger select exchange callback", () => {
    const mockOnTransferFunds = jest.fn();
    const converterWrapper = mount(
      <Converter state={fullState} onTransferFunds={mockOnTransferFunds} />
    );
    const button = converterWrapper.find(".conversion-form__exchange");
    expect(button).toHaveLength(1);
    button.simulate("submit");
    expect(mockOnTransferFunds).toHaveBeenCalledWith({
      fromPocketCode: "EUR",
      fromValue: "",
      toPocketCode: "USD",
      toValue: ""
    });
  });
  it("Should trigger exchange with field values", () => {
    const mockOnTransferFunds = jest.fn();
    const converterWrapper = mount(
      <Converter state={fullState} onTransferFunds={mockOnTransferFunds} />
    );
    const submitButton = converterWrapper.find(".conversion-form__exchange");
    const fromValue = converterWrapper.find(".conversion-form__from-value");
    const toValue = converterWrapper.find(".conversion-form__to-value");
    expect(submitButton).toHaveLength(1);
    expect(fromValue).toHaveLength(1);
    expect(toValue).toHaveLength(1);

    fromValue.simulate("change", { target: { value: 10 } });

    submitButton.simulate("submit");
    expect(mockOnTransferFunds).toHaveBeenCalledWith({
      fromPocketCode: "EUR",
      fromValue: 10,
      toPocketCode: "USD",
      toValue: 15
    });
  });

  it("Should trigger exchange with field values capping at max pocket", () => {
    const mockOnTransferFunds = jest.fn();
    const converterWrapper = mount(
      <Converter state={fullState} onTransferFunds={mockOnTransferFunds} />
    );
    const submitButton = converterWrapper.find(".conversion-form__exchange");
    const fromValue = converterWrapper.find(".conversion-form__from-value");
    const toValue = converterWrapper.find(".conversion-form__to-value");
    expect(submitButton).toHaveLength(1);
    expect(fromValue).toHaveLength(1);
    expect(toValue).toHaveLength(1);

    fromValue.simulate("change", { target: { value: 250 } });

    submitButton.simulate("submit");
    expect(mockOnTransferFunds).toHaveBeenCalledWith({
      fromPocketCode: "EUR",
      fromValue: 234.23,
      toPocketCode: "USD",
      toValue: 351.34
    });
  });

  it("Should trigger exchange with field values with to field", () => {
    const mockOnTransferFunds = jest.fn();
    const converterWrapper = mount(
      <Converter state={fullState} onTransferFunds={mockOnTransferFunds} />
    );
    const submitButton = converterWrapper.find(".conversion-form__exchange");
    const fromValue = converterWrapper.find(".conversion-form__from-value");
    const toValue = converterWrapper.find(".conversion-form__to-value");
    expect(submitButton).toHaveLength(1);
    expect(fromValue).toHaveLength(1);
    expect(toValue).toHaveLength(1);

    toValue.simulate("change", { target: { value: 10 } });

    submitButton.simulate("submit");
    expect(mockOnTransferFunds).toHaveBeenCalledWith({
      fromPocketCode: "EUR",
      fromValue: 6.67,
      toPocketCode: "USD",
      toValue: 10
    });
  });
  it("Should trigger exchange with field values with to field cap", () => {
    const mockOnTransferFunds = jest.fn();
    const converterWrapper = mount(
      <Converter state={fullState} onTransferFunds={mockOnTransferFunds} />
    );
    const submitButton = converterWrapper.find(".conversion-form__exchange");
    const fromValue = converterWrapper.find(".conversion-form__from-value");
    const toValue = converterWrapper.find(".conversion-form__to-value");
    expect(submitButton).toHaveLength(1);
    expect(fromValue).toHaveLength(1);
    expect(toValue).toHaveLength(1);

    toValue.simulate("change", { target: { value: 1000 } });

    submitButton.simulate("submit");
    expect(mockOnTransferFunds).toHaveBeenCalledWith({
      fromPocketCode: "EUR",
      fromValue: 234.23,
      toPocketCode: "USD",
      toValue: 351.34
    });
  });
  // TODO: add tests for individual functions (as there are quite a few)
});