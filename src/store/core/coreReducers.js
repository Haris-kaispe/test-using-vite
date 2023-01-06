import { combineReducers } from "redux";

import exampleReducer from "../common/reducers";

const coreReducer = combineReducers({
  exampleReducer,
});

export default coreReducer;
