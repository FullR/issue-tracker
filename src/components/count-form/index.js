import React, {PropTypes, Component} from "react";
import cx from "./style.css";
import Button from "components/button";
import Screen from "components/screen";
import RaisedButton from "material-ui/RaisedButton";

export default class CountForm extends Component {
  render() {
    const {count, onIncrement, onDecrement, className} = this.props;
    const classNames = cx(className, "root");

    return (
      <Screen className={classNames}>
        <RaisedButton label="-" onClick={onDecrement} primary/>
          {count}
        <RaisedButton label="+" onClick={onIncrement} primary/>
      </Screen>
    );
  }
}

CountForm.propTypes = {};
CountForm.defaultProps = {};
