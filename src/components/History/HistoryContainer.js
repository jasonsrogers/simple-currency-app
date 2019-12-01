import { connect } from "react-redux";
import { History } from "components/History/History";
import { fetchRates } from "actions/actions";

const mapStateToProps = state => {
  const {history} = state;
  return {history};
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchRates(currency) {
      dispatch(fetchRates(currency));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
