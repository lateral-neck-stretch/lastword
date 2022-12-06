import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import prompt from "./prompt";
import prompts from "./prompts";
import usersReducer from "./users";
import transcript from "./watson";
import result from "./result";
import userResults from "./userResults";

const reducer = combineReducers({
  auth,
  prompt,
  prompts,
  transcript,
  usersReducer,
  result,
  userResults,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
