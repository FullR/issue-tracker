import {connect} from "react-redux";
import CasePage from "components/case-page";
import {actions} from "reducers/cases";

function mapStateToProps(state) {
  const {cases, selectedCase} = state.cases;
  return {cases, selectedCase};
}

function mapDispatchToProps(dispatch) {
  return {
    onCreateCase: () => dispatch(actions.createCase()),
    onSelectCase: (id) => dispatch(actions.selectCase(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CasePage);
