import { connect } from "react-redux";
import { Header } from "components/Header/Header";
import { fetchRates } from "actions/actions";

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchRates(code) {
      dispatch(fetchRates(code));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
