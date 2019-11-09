import { connect } from "react-redux";
import { PocketList } from "components/PocketList/PocketList";

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PocketList);
