import React, {PropTypes} from "react";
import cx from "./style.css";

export default function Button(props) {
  const {onClick, children, className} = props;
  const classNames = cx(className, "root");

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func
};
Button.defaultProps = {};
