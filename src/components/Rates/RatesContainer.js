import { connect } from "react-redux";
import { Rates } from "components/Rates/Rates";
import { fetchRates } from "actions/actions";

const mapStateToProps = state => {
  const {
    selectedPocketRates,
    selectedFromPocketCurrency,
    selectedPocketRates: { selectedRateInfo }
  } = state;
  return {
    selectedPocketRates,
    selectedFromPocketCurrency,
    selectedRateInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchRates(currency) {
      dispatch(fetchRates(currency));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rates);
