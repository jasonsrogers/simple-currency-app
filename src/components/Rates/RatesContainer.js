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
    onFetchRates() {
      dispatch(fetchRates());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rates);
