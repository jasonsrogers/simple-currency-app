export const getInitialState = () => {
  return {
    // Going on the assumption that we'll only want one at a time,
    // We can expand selectedPocketRates to have attributes per currency pocket
    selectedPocketCurrency: {},
    selectedPocketRates: {
      isLoading: false,
      error: undefined,
      selectedRateInfo: {}
    },
    selectedToPocket: {}, // TODO: might not be needed

    pockets: {
      // Note: we would really load the values from the BE and have the display strings elsewhere
      // but this will work for a first bash
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
};

export default getInitialState;
