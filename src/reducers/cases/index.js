import actionRouter from "util/action-router";
import Guid from "guid";

module.exports = actionRouter({
  cases: [],
  selectedCase: null
}, {
  CREATE_CASE: {
    reduce: (state) => {
      const id = Guid.raw();
      const timestamp = Date.now();
      const c = {
        id,
        timestamp
      };
      return {
        ...state,
        cases: [c, ...state.cases],
        selectedCase: id
      };
    }
  },

  SELECT_CASE: {
    create: (id) => ({id}),
    reduce: (state, {id}) => id === state.selectedCase ? state : ({
      ...state,
      selectedCase: id
    })
  }
});
