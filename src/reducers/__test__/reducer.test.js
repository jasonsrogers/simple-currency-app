import reducer from "../reducer";

const initialState = describe("Reducers: ", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      pockets: {
        EUR: {
          amount: 234.23,
          code: "EUR",
          description: "Euro",
          symbol: "€"
        },
        GBP: {
          amount: 123.12,
          code: "GBP",
          description: "British Pound",
          symbol: "£"
        },
        USD: {
          amount: 50,
          code: "USD",
          description: "American Dollar",
          symbol: "$"
        }
      },
      selectedFromPocketCurrency: "GBP",
      selectedPocketRates: {
        error: undefined,
        isLoading: false,
        selectedRateInfo: {}
      },
      selectedToPocket: {},
      selectedToPocketCurrency: "USD"
    });
  });
  it("should Set EUR as the from currency pocket and leave USD as from", () => {
    let res = reducer(undefined, {
      type: "SELECT_FROM_POCKET",
      code: "EUR"
    });
    expect(res.selectedFromPocketCurrency).toEqual("EUR");
    expect(res.selectedToPocketCurrency).toEqual("USD");
  });
  it("should Set USD as the from currency pocket and set from to ''", () => {
    let res = reducer(undefined, {
      type: "SELECT_FROM_POCKET",
      code: "USD"
    });
    expect(res.selectedFromPocketCurrency).toEqual("USD");
    expect(res.selectedToPocketCurrency).toEqual("");
  });
  it("should Set EUR as the to currency pocket and leave from", () => {
    let res = reducer(undefined, {
      type: "SELECT_TO_POCKET",
      code: "EUR"
    });
    expect(res.selectedFromPocketCurrency).toEqual("GBP");
    expect(res.selectedToPocketCurrency).toEqual("EUR");
  });
  it("should signal that it's loading new rate info, but keep the existing ones", () => {
    let res = reducer(undefined, {
      type: "REQUEST_RATES",
      currency: "EUR"
    });
    const selectedPocketRates = {
      error: undefined,
      isLoading: true,
      selectedRateInfo: {}
    };
    expect(res.selectedPocketCurrency).toEqual("EUR");
    expect(res.selectedPocketRates).toEqual(selectedPocketRates);
  });
  it("should update state with new rates", () => {
    let res = reducer(undefined, {
      type: "RECEIVE_RATES",
      selectedRateInfo: { a: 1 }
    });
    const selectedPocketRates = {
      error: undefined,
      isLoading: false,
      selectedRateInfo: { a: 1 }
    };
    expect(res.selectedPocketRates).toEqual(selectedPocketRates);
  });
});
