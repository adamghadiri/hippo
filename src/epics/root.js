import { combineEpics } from "redux-observable";
import storyByRankSubscriber from "./storyByRankSubscriber";
import itemByIdSubscriber from "./itemByIdSubscriber";

export const rootEpic = combineEpics(storyByRankSubscriber, itemByIdSubscriber);
