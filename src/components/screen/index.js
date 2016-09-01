import React, {PropTypes} from "react";
import cx from "./style.css";

export default function Screen(props) {
  const {children, className} = props;
  const classNames = cx(className, "root");

  return (
    <div className={classNames}>
      {children}
    </div>
  );
}

Screen.propTypes = {};
Screen.defaultProps = {};
