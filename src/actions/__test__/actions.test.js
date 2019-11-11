import * as actions from "../actions";

import * as service from "service/ratesService";

describe("Actions: Pocket selection", () => {
  it("should create an action to select the to pocket", () => {
    const code = "EUR";
    const expectedAction = {
      type: actions.SELECT_TO_POCKET,
      code
    };
    expect(actions.selectToPocket(code)).toEqual(expectedAction);
  });
  it("should create an action to select the from pocket", () => {
    const code = "EUR";
    const expectedAction = {
      type: actions.SELECT_FROM_POCKET,
      code
    };
    expect(actions.changeFromPocket(code)).toEqual(expectedAction);
  });
  it("selectFromPocket should dispatch changeFromPocket and fetchRates", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const code = "EUR";
    const expectedAction = {
      type: actions.SELECT_FROM_POCKET,
      code
    };

    await actions.selectFromPocket(code)(dispatch, getState);

    expect(dispatch).toBeCalledWith(expectedAction);
    // TODO: missing test to fetchRates
  });
});

describe("Actions: Rates", () => {
  it("should dispatch an action to transfer rates", () => {
    const fromPocketCode = "EUR";
    const fromValue = 100;
    const toPocketCode = "EUR";
    const toValue = 50;
    const expectedAction = {
      type: actions.TRANSFER_FUNDS,
      fromPocketCode,
      fromValue,
      toPocketCode,
      toValue
    };
    expect(
      actions.transferFunds({
        type: actions.TRANSFER_FUNDS,
        fromPocketCode,
        fromValue,
        toPocketCode,
        toValue
      })
    ).toEqual(expectedAction);
  });

  it("fetchRates should dispatch requestRates and receiveRates", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const code = "EUR";
    const expectedAction = {
      type: actions.REQUEST_RATES,
      currency: code
    };
    const expectedAction2 = {
      type: actions.RECEIVE_RATES,
      currency: code,
      selectedRateInfo: {}
    };

    // const mockSuccessResponse = {};
    // const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({
      // 3
    //   json: () => mockJsonPromise
    
    });
    const mockFn = jest
      .spyOn(service, "getRates")
      .mockImplementation(() => mockFetchPromise);

    await actions.fetchRates(code)(dispatch, getState);

    expect(dispatch).toBeCalledWith(expectedAction);
    expect(mockFn).toBeCalledWith("EUR");
    expect(dispatch).toBeCalledWith(expectedAction2);
  });
});
