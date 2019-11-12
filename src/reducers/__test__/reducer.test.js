import reducer from "../reducer";
describe("Reducers: ", () => {
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
});
