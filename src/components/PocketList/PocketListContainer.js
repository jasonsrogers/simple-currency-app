import { connect } from "react-redux";
import { PocketList } from "components/PocketList/PocketList";
import { selectFromPocket } from "actions/actions";

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectPocket(code) {
      dispatch(selectFromPocket(code));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PocketList);
