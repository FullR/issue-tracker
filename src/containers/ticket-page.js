import {connect} from "react-redux";
import TicketPage from "components/ticket-page";
import {actions} from "reducers/tickets";

function mapStateToProps(state) {
  const {tickets, ticketFields, selectedTicket} = state.tickets;
  return {tickets, ticketFields, selectedTicket};
}

function mapDispatchToProps(dispatch) {
  return {
    onCreateTicket: () => dispatch(actions.createTicket()),
    onSelectTicket: (id) => dispatch(actions.selectTicket(id)),
    onAddField: (type, ticketId) => dispatch(actions.addTicketField(type, ticketId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketPage);
