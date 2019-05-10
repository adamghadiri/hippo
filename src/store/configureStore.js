import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import stories from "../reducers/stories";
import items from "../reducers/items";
import { rootEpic } from "../epics/root";

export default () => {
  const epicMiddleware = createEpicMiddleware();
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers({ stories, items }),
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
};
