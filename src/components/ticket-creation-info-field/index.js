import React, {PropTypes} from "react";
import cx from "./style.css";

export default function TicketCreationInfoField(props) {
  const {ticket, children, className} = props;
  const classNames = cx(className, "root");
  const {id, timestamp} = ticket;

  return (
    <div className={classNames}>
      <div>{id}</div>
      <div>{timestamp}</div>
    </div>
  );
}

TicketCreationInfoField.propTypes = {};
TicketCreationInfoField.defaultProps = {};
