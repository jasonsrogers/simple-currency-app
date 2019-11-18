import reducer from "reducers/reducer";
import * as actions from "actions/actions";

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
      selectedToPocketCurrency: "USD",
      history: [
        {
          fromPocketCode: "EUR",
          fromValue: 12,
          toPocketCode: "GBP",
          toValue: 10,
          rate: 1.2,
          date: "Sun Nov 17 2019 23:55:38 GMT+0000 (Greenwich Mean Time)"
        }
      ]
    });
  });
  it("should Set EUR as the from currency pocket and leave USD as from", () => {
    let res = reducer(undefined, {
      type: actions.SELECT_FROM_POCKET,
      code: "EUR"
    });
    expect(res.selectedFromPocketCurrency).toEqual("EUR");
    expect(res.selectedToPocketCurrency).toEqual("USD");
  });
  it("should Set USD as the from currency pocket and set from to ''", () => {
    let res = reducer(undefined, {
      type: actions.SELECT_FROM_POCKET,
      code: "USD"
    });
    expect(res.selectedFromPocketCurrency).toEqual("USD");
    expect(res.selectedToPocketCurrency).toEqual("");
  });
  it("should Set EUR as the to currency pocket and leave from", () => {
    let res = reducer(undefined, {
      type: actions.SELECT_TO_POCKET,
      code: "EUR"
    });
    expect(res.selectedFromPocketCurrency).toEqual("GBP");
    expect(res.selectedToPocketCurrency).toEqual("EUR");
  });
  it("should signal that it's loading new rate info, but keep the existing ones", () => {
    let res = reducer(undefined, {
      type: actions.REQUEST_RATES,
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
      type: actions.RECEIVE_RATES,
      selectedRateInfo: { a: 1 }
    });
    const selectedPocketRates = {
      error: undefined,
      isLoading: false,
      selectedRateInfo: { a: 1 }
    };
    expect(res.selectedPocketRates).toEqual(selectedPocketRates);
  });

  it("should transfer money between pockets, round values", () => {
    const fromPocketCode = "EUR";
    const toPocketCode = "GBP";
    let res = reducer(undefined, {
      type: actions.TRANSFER_FUNDS,
      fromPocketCode,
      fromValue: 15,
      toPocketCode,
      toValue: 10
    });

    const resFromPocket = {
      code: "EUR",
      amount: 219.23,
      symbol: "€",
      description: "Euro"
    };
    const resToPocket = {
      code: "GBP",
      amount: 133.12,
      symbol: "£",
      description: "British Pound"
    };

    expect(res.pockets[fromPocketCode]).toEqual(resFromPocket);
    expect(res.pockets[toPocketCode]).toEqual(resToPocket);
  });
  it("should transfer money between pockets, float values", () => {
    const fromPocketCode = "EUR";
    const toPocketCode = "GBP";
    let res = reducer(undefined, {
      type: actions.TRANSFER_FUNDS,
      fromPocketCode,
      fromValue: 15.15,
      toPocketCode,
      toValue: 10.45
    });

    const resFromPocket = {
      code: "EUR",
      amount: 219.08,
      symbol: "€",
      description: "Euro"
    };
    const resToPocket = {
      code: "GBP",
      amount: 133.57,
      symbol: "£",
      description: "British Pound"
    };

    expect(res.pockets[fromPocketCode]).toEqual(resFromPocket);
    expect(res.pockets[toPocketCode]).toEqual(resToPocket);
  });

  it("should add to the history", () => {
    const fromPocketCode = "EUR";
    const fromValue = 100;
    const toPocketCode = "EUR";
    const toValue = 50;
    const date = "Sun Nov 17 2019 23:55:38 GMT+0000 (Greenwich Mean Time)";
    const rate = 0.5;

    const historyItem = {
      rate,
      date,
      fromPocketCode,
      fromValue,
      toPocketCode,
      toValue
    };

    let res = reducer(
      {
        history: [
          {
            fromPocketCode: "EUR",
            fromValue: 12,
            toPocketCode: "GBP",
            toValue: 10,
            rate: 1.2,
            date: "Sun Nov 17 2019 23:55:38 GMT+0000 (Greenwich Mean Time)"
          }
        ]
      },
      {
        type: actions.ADD_TO_HISTORY,
        historyItem
      }
    );
    expect(res.history.length).toBe(2);
    // gets pushed to the front of history
    expect(res.history[0]).toEqual(historyItem);
  });
});
