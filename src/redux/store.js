import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { contentListReducer } from "../reducers/contentReducer";

const rootReducer = combineReducers({
  contentList: contentListReducer,
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;

