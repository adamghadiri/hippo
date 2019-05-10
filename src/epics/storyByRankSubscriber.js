import { ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError, filter, takeUntil } from "rxjs/operators";
import actionTypes from "../actions/stories/types";
import actions from "../actions/stories/actions";
import { database } from "../db/firebase";

const createStoryByRankObservable = rank => {
  return Observable.create(observer => {
    let storyRef;
    let onStoryChange;
    const topStoriesRef = database.ref("v0/topstories").child(rank);

    const onTopStoriesChange = topStoriesRef.on(
      "value",
      snapshot => {
        const storyId = snapshot.val();
        if (storyRef && onStoryChange) {
          storyRef.off("value", onStoryChange);
        }
        storyRef = database.ref("v0/item").child(storyId);
        onStoryChange = storyRef.on("value", snapshot =>
          observer.next(snapshot.val(), error => observer.error(error))
        );
      },
      error => observer.error(error)
    );

    return () => {
      if (storyRef && onStoryChange) {
        storyRef.off("value", onStoryChange);
      }
      if (rank !== undefined) {
        topStoriesRef.off("value", onTopStoriesChange);
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
