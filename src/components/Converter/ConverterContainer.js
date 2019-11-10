import { connect } from "react-redux";
import { Converter } from "components/Converter/Converter";
import { transferFunds, selectToPocket } from "actions/actions";
const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTransferFunds(params) {
      dispatch(transferFunds({ ...params }));
    },
    onSelectToPocket(code) {
      dispatch(selectToPocket(code));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Converter);
