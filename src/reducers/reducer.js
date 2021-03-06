// Main reducer of app
// TODO: split if this grows

import { roundAdd, roundSub } from "service/ratesService";

import getInitialState from "service/initial-state";
import {
  REQUEST_RATES,
  RECEIVE_RATES,
  TRANSFER_FUNDS,
  SELECT_FROM_POCKET,
  SELECT_TO_POCKET,
  ADD_TO_HISTORY
} from "actions/actions";
export default (state = { ...getInitialState() }, action) => {
  switch (action.type) {
    case SELECT_FROM_POCKET: {
      return {
        ...state,
        selectedFromPocketCurrency: action.code,
        selectedToPocketCurrency:
          action.code === state.selectedToPocketCurrency
            ? ""
            : state.selectedToPocketCurrency
      };
    }
    case SELECT_TO_POCKET: {
      return {
        ...state,
        selectedToPocketCurrency: action.code
      };
    }
    case REQUEST_RATES: {
      let selectedPocketRates = {
        // keep the previous rates until next ones loaded to avoid blink
        ...state.selectedPocketRates,
        ...{ isLoading: true, error: undefined }
      };
      return {
        ...state,
        selectedPocketCurrency: action.currency,
        selectedPocketRates
      };
    }
    case RECEIVE_RATES: {
      return {
        ...state,
        // selectedPocketCurrency: action.currency,
        selectedPocketRates: {
          isLoading: false,
          error: undefined,
          // Note:  I think that FOR THIS APP we should maintain the old rate until we receive
          // the() new one just in case it fails (better display the last rate we had than none)
          // but that could pause problems with accuracy of transfer.
          selectedRateInfo: action.selectedRateInfo
        }
      };
    }
    case TRANSFER_FUNDS: {
      const { fromPocketCode, fromValue, toPocketCode, toValue } = action;

      let pockets = { ...state.pockets };
      let fromPocket = { ...pockets[fromPocketCode] };
      // fromPocket.amount -= fromValue; // => error in float substract
      fromPocket.amount = roundSub(fromPocket.amount, fromValue);

      let toPocket = { ...pockets[toPocketCode] };
      // toPocket.amount += toValue; // => error in float add
      toPocket.amount = roundAdd(toPocket.amount, toValue);

      pockets[fromPocketCode] = fromPocket;
      pockets[toPocketCode] = toPocket;

      return {
        ...state,
        pockets
      };
    }
    case ADD_TO_HISTORY: {
      return {
        ...state,
        history: [action.historyItem, ...state.history]
      };
    }
    default:
      return state;
  }
};
