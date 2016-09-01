import {connect} from "react-redux";
import CountForm from "components/count-form";
import {actions} from "reducers/count";

function mapStateToProps({count}) {
  return {count};
}

function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch(actions.increment()),
    onDecrement: () => dispatch(actions.decrement())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountForm);
