import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promiseMiddleware from "redux-promise-middleware";
import reducer from "./redux";

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
);
