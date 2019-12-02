import { connect } from "react-redux";
import { Converter } from "components/Converter/Converter";
import { transferFunds, selectToPocket, addToHistory } from "actions/actions";

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
    },
    onAddToHistory(params) {
      dispatch(addToHistory(params));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Converter);
