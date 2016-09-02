import React, {PropTypes} from "react";
import cx from "./style.css";
import TextField from "material-ui/TextField";

export default function TicketTextField(props) {
  const {field, onChange, className} = props;
  const classNames = cx(className, "root");

  return (
    <TextField className={classNames} onChange={onChange} multiline>
      {field.data.text}
    </TextField>
  );
}

TicketTextField.propTypes = {};
TicketTextField.defaultProps = {};
