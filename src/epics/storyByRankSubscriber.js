import { ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError, filter, takeUntil } from "rxjs/operators";
import actionTypes from "../actions/stories/types";
import actions from "../actions/stories/actions";
import { database } from "../db/firebase";

const createStoryByRankObservable = rank => {
  return Observable.create(observer => {
    let id;
    const onError = error => {
      observer.error(error);
    };
    const onItemChange = snapshot => {
      observer.next(snapshot.val());
    };
    const onTopStoriesChange = snapshot => {
      const newId = snapshot.val();
      if (!id) {
        id = newId;
      } else {
        database
          .ref("v0/item")
          .child(id)
          .off();
      }
      database
        .ref("v0/item")
        .child(newId)
        .on("value", onItemChange, onError);
    };
    database
      .ref("v0/topstories")
      .child(rank)
      .on("value", onTopStoriesChange, onError);
    return () => {
      if (id) {
        database
          .ref("v0/item")
          .child(id)
          .off();
      }
      if (typeof rank === "number") {
        database
          .ref("v0/topstories")
          .child(rank)
          .off();
      }
      observer.complete();
    };
  });
};

const success = rank =>
  map(response => {
    const { title, by, id, kids, score, time, url } = response;
    return actions.subscribeToStoryByRankSuccess(rank, {
      title,
      by,
      id,
      kids,
      score,
      time,
      url
    });
  });

const cancel = (action$, rank) =>
  takeUntil(
    action$.pipe(
      filter(
        action =>
          action.type === actionTypes.SUBSCRIBE_TO_STORY_BY_RANK_CANCEL &&
          action.payload.rank === rank
      )
    )
  );

const failure = rank =>
  catchError(error => of(actions.subscribeToStoryByRankFailure(rank, error)));

export default action$ => {
  return action$.pipe(
    ofType(actionTypes.SUBSCRIBE_TO_STORY_BY_RANK),
    mergeMap(action => {
      const { rank } = action.payload;
      return createStoryByRankObservable(rank).pipe(
        success(rank),
        cancel(action$, rank),
        failure(rank)
      );
    })
  );
};
