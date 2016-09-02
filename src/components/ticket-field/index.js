import React, {PropTypes} from "react";
import CreationInfoField from "components/ticket-creation-info-field";
import TextField from "components/ticket-text-field";

const fieldTypes = {
  TEXT: TextField,
  CREATION_INFO: CreationInfoField
};

export default function TicketField(props) {
  const {field, ...rest} = props;
  const Field = fieldTypes[field.type];
  if(!Field) console.log(`Couldn't find field component with type ${field.type}`);

  return (<Field {...rest}/>);
}

TicketField.propTypes = {
  type: PropTypes.oneOf(Object.keys(fieldTypes))
};
TicketField.defaultProps = {};
