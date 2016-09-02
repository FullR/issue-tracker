import React, {PropTypes} from "react";
import cx from "./style.css";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Flex from "components/flex";
import TicketField from "components/ticket-field";

const addableFields = [
  {type: "TEXT", text: "Text"}
];

const Container = Flex.bound({
  column: true,
  grow: true,
  scrollable: true
});

const Fields = Flex.bound({
  column: true,
  grow: true
});

const FieldRow = Flex.bound({
  row: true
});

export default function TicketEditForm(props) {
  const {onAddField=window.noop, ticket, ticketFields, className} = props;
  const classNames = cx("root");

  return (
    <Container className={classNames}>
      <SelectField onChange={(e, k, value) => onAddField(value, ticket.id)} value="_HIDDEN_PLACEHOLDER">
        <MenuItem value="_HIDDEN_PLACEHOLDER" label="Add field" hidden/>
        {addableFields.map((field) =>
          <MenuItem
            key={field.type}
            value={field.type}
            primaryText={field.text}
          />
        )}
      </SelectField>
      <Fields>
        <TicketField ticket={ticket} field={{type: "CREATION_INFO"}}/>
        {ticketFields.map((field) =>
          <FieldRow key={field.id}>
            <TicketField field={field} ticket={ticket}/>
          </FieldRow>
        )}
      </Fields>
    </Container>
  );
}

TicketEditForm.propTypes = {};
TicketEditForm.defaultProps = {};
