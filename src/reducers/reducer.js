import getInitialState from "service/initial-state";
import { REQUEST_RATES, RECEIVE_RATES } from "actions/actions";
export default (state = { ...getInitialState() }, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
