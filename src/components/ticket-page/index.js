import React, {PropTypes} from "react";
import cx from "./style.css";
import bindComponent from "util/bind-component";
import Flex from "components/flex";
import IconButton from "material-ui/IconButton";
import AddBoxIcon from "material-ui/svg-icons/content/add-box";
import TicketEditForm from "components/ticket-edit-form";

const Column = Flex.bound({column: true});
const Row = Flex.bound({row: true});

const Container = Row.bound({grow: true, height: "100%"});
const Main = Row.bound({grow: true});
const MainColumn = Column.bound({grow: true});
const TicketList = Column.bound({grow: true});
const TicketListHeader = Row.bound({height: "5em", reverse: true, style: {zIndex: 2}});
const TicketListItems = Column.bound({grow: true, scrollable: true});
const AddCaseButton = (props) => (<IconButton {...props} tooltip="Create new ticket" tooltipPosition="bottom-center"><AddBoxIcon/></IconButton>);

const TicketListItem = Row.bound({minHeight: "10em"});

export default function TicketPage(props) {
  const {
    tickets=[],
    ticketFields=[],
    onCreateTicket=window.noop,
    onSelectTicket=window.noop,
    onAddField=window.noop,
    selectedTicket
  } = props;
  const currentTicket = selectedTicket ? tickets.find((c) => c.id === selectedTicket) : null;
  const currentTicketFields = currentTicket ? ticketFields.filter((field) => field.ticketId === currentTicket.id) : null;
  const classNames = cx("root");

  return (
    <Container className={classNames}>
      <Main>
        <MainColumn>
          <TicketList>
            <TicketListHeader>
              <AddCaseButton onClick={onCreateTicket}/>
            </TicketListHeader>
            <TicketListItems>
              {tickets.map((c) =>
                <TicketListItem
                  key={c.id}
                  selected={c.id === selectedTicket}
                  onClick={() => onSelectTicket(c.id)}
                >
                  <div>{c.id}</div>
                  <div>{new Date(c.timestamp).toISOString()}</div>
                </TicketListItem>
              )}
            </TicketListItems>
          </TicketList>
        </MainColumn>
        <MainColumn>
          {selectedTicket ?
            <TicketEditForm
              ticket={currentTicket}
              ticketFields={currentTicketFields}
              onAddField={onAddField}
            /> :
            null
          }
        </MainColumn>
      </Main>
    </Container>
  );
}

TicketPage.propTypes = {
  tickets: PropTypes.array,
  selectedTicket: PropTypes.string,
  onCreateTicket: PropTypes.func,
  onSelectTicket: PropTypes.func,
  onAddField: PropTypes.func
};
