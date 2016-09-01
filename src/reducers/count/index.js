import actionRouter from "util/action-router";

module.exports = actionRouter(0, {
  INCREMENT: {
    create: () => ({type: "INCREMENT"}),
    reduce: (state) => state + 1
  },

  DECREMENT: {
    create: () => ({type: "DECREMENT"}),
    reduce: (state) => state - 1
  }
});
