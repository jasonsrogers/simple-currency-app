import getInitialState from "service/initial-state";
import {
  REQUEST_RATES,
  RECEIVE_RATES,
  TRANSFER_FUNDS,
  SELECT_FROM_POCKET,
  SELECT_TO_POCKET
} from "actions/actions";
export default (state = { ...getInitialState() }, action) => {
  switch (action.type) {
    case SELECT_FROM_POCKET:
      return {
        ...state,
        selectedFromPocketCurrency: action.code,
        selectedToPocketCurrency:
          action.code === state.selectedToPocketCurrency
            ? ""
            : state.selectedToPocketCurrency
      };
    case SELECT_TO_POCKET:
      return {
        ...state,
        selectedToPocketCurrency: action.code
      };

    case REQUEST_RATES:
      return {
        ...state,
        selectedPocketCurrency: action.currency,
        selectedPocketRates: {
          isLoading: true,
          error: undefined
        }
      };
    case RECEIVE_RATES:
      return {
        ...state,
        // selectedPocketCurrency: action.currency,
        selectedPocketRates: {
          isLoading: false,
          error: undefined,
          // Note:  I think that FOR THIS APP we should maintain the old rate until we receive
          // the new one just in case it fails (better display the last rate we had than none)
          // but that could pause problems with accuracy of transfer.
          selectedRateInfo: action.selectedRateInfo
        }
      };
    case TRANSFER_FUNDS:
      const { fromPocketCode, fromValue, toPocketCode, toValue } = action;

      let pockets = { ...state.pockets };
      let fromPocket = { ...pockets[fromPocketCode] };
      fromPocket.amount -= fromValue;
      let toPocket = { ...pockets[toPocketCode] };
      toPocket.amount += toValue;
      pockets[fromPocketCode] = fromPocket;
      pockets[toPocketCode] = toPocket;

      return {
        ...state,
        pockets
      };
    default:
      return state;
  }
};
