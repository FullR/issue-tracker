import React from "react";
import {Provider} from "react-redux";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import store from "store";

import TicketPage from "containers/ticket-page";
import CountForm from "containers/count-form";

const history = syncHistoryWithStore(hashHistory, store);

export default function AppRouter() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/counter" component={CountForm}/>
        <Route path="*" component={TicketPage}/>
      </Router>
    </Provider>
  );
}
