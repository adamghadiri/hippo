import actionTypes from "../../actions/items/types";
import itemsReducer from "../../reducers/items";

test("should set default state", () => {
  const state = itemsReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("should reduce subscribe to item by id properly", () => {
  const id = "testid";
  const action = { type: actionTypes.SUBSCRIBE_TO_ITEM_BY_ID, payload: { id } };
  const state = itemsReducer({}, action);
  expect(state).toEqual({
    [action.payload.id]: {
      loading: true,
      data: null,
      error: null
    }
  });
});

test("should reduce subscribe to item by id success properly", () => {
  const id = "testid";
  const item = { field: "value" };
  const action = {
    type: actionTypes.SUBSCRIBE_TO_ITEM_BY_ID_SUCCESS,
    payload: { id, item }
  };
  const state = itemsReducer({}, action);
  expect(state).toEqual({
    [action.payload.id]: {
      loading: false,
      data: action.payload.item,
      error: null
    }
  });
});

test("should reduce subscribe to item by id cancel properly", () => {
  const id = "testid";
  const action = {
    type: actionTypes.SUBSCRIBE_TO_ITEM_BY_ID_CANCEL,
    payload: { id }
  };
  const state = itemsReducer({}, action);
  expect(state).toEqual({
    [action.payload.id]: {
      loading: false,
      data: null,
      error: null
    }
  });
});

test("should reduce subscribe to item by id failure properly", () => {
  const id = "testid";
  const error = { message: "error" };
  const action = {
    type: actionTypes.SUBSCRIBE_TO_ITEM_BY_ID_FAILURE,
    payload: { id }
  };
  const state = itemsReducer({}, action);
  expect(state).toEqual({
    [action.payload.id]: {
      loading: false,
      data: null,
      error: action.payload.error
    }
  });
});
