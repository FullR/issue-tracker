import {connect} from "react-redux";
import LoginForm from "components/login-form";
import {actions} from "reducers/user";

function mapStateToProps({user, loggedIn, error}) {
  return {user, loggedIn, error};
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: ({username, password}) => dispatch(actions.login(username, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
