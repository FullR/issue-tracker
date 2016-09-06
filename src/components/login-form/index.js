import React, {PropTypes} from "react";
import cx from "./style.css";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class LoginForm extends React.Component {
  static defaultProps = {onSubmit: window.noop};
  state = {username: "admin", password: "password"};
  handleUsernameChange = (e, v) => this.setState({username: v});
  handlePasswordChange = (e, v) => this.setState({password: v});
  handleSubmit = (e) => {
    if(e && e.preventDefault) e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const {children, className} = this.props;
    const {username, password} = this.state;
    const classNames = cx(className, "root");

    return (
      <div className={classNames}>
        <form onSubmit={this.handleSubmit}>
          <TextField value={username} onChange={this.handleUsernameChange}/>
          <TextField value={password} onChange={this.handlePasswordChange}/>
          <RaisedButton onClick={this.handleSubmit}>Login</RaisedButton>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {};
LoginForm.defaultProps = {};
