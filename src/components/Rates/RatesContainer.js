import { connect } from "react-redux";
import { Rates } from "components/Rates/Rates";
import { fetchRates } from "actions/actions";

const mapStateToProps = state => {
  return {
    state
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
