import { connect } from "react-redux";
import { Converter } from "components/Converter/Converter";
import { transferFunds } from "actions/actions";
const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTransferFunds(params) {
      dispatch(transferFunds({ ...params }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter);
