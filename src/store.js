import {combineReducers, applyMiddleware, createStore} from "redux";
import {routerReducer} from "react-router-redux";
import thunk from "redux-thunk";
import logger from "util/logger-middleware";
import reducers from "./reducers";

const store = createStore(
  combineReducers(
    Object.assign({}, reducers, {
      routing: routerReducer
    })
  ),
  applyMiddleware(thunk, logger)
);

console.log(`Initial state =`, store.getState());

export default store;
