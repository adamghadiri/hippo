import { ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError, filter, takeUntil } from "rxjs/operators";
import actionTypes from "../actions/items/types";
import actions from "../actions/items/actions";
import { database } from "../db/firebase";

const createItemByIdObservable = id => {
  return Observable.create(observer => {
    const onError = error => {
      observer.error(error);
    };
    const onItemChange = snapshot => {
      observer.next(snapshot.val());
    };
    database.ref(`v0/item/${id}`).on("value", onItemChange, onError);
    return () => {
      if (id) {
        database.ref(`v0/item/${id}`).off();
      }
      observer.complete();
    };
  });
};

const success = id =>
  map(response => {
    return actions.subscribeToItemByIdSuccess(id, response);
  });

const cancel = (action$, id) =>
  takeUntil(
    action$.pipe(
      filter(
        action =>
          action.type === actionTypes.SUBSCRIBE_TO_ITEM_BY_ID_CANCEL &&
          action.payload.id === id
      )
    )
  );

const failure = id =>
  catchError(error => of(actions.subscribeToItemByIdFailure(id, error)));

export default action$ => {
  return action$.pipe(
    ofType(actionTypes.SUBSCRIBE_TO_ITEM_BY_ID),
    mergeMap(action => {
      const id = action.payload.id;
      return createItemByIdObservable(id).pipe(
        success(id),
        cancel(action$, id),
        failure(id)
      );
    })
  );
};
