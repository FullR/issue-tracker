import actionRouter from "util/action-router";
import Guid from "guid";

module.exports = actionRouter({
  tickets: [],
  ticketFields: [],
  selectedTicket: null
}, {
  CREATE_TICKET: {
    reduce: (state) => {
      const id = Guid.raw();
      const timestamp = Date.now();
      const ticket = {
        id,
        timestamp
      };
      return {
        ...state,
        tickets: [ticket, ...state.tickets],
        selectedTicket: id
      };
    }
  },

  SELECT_TICKET: {
    create: (id) => ({id}),
    reduce: (state, {id}) => id === state.selectedTicket ? state : ({
      ...state,
      selectedTicket: id
    })
  },

  ADD_TICKET_FIELD: {
    create: (type, ticketId) => ({type, ticketId}),
    reduce: (state, {type, ticketId}) => {
      const id = Guid.raw();
      const timestamp = Date.now();
      return {
        ...state,
        ticketFields: [
          ...state.ticketFields,
          {id, ticketId, timestamp, type}
        ]
      }
    }
  }
});
