import actions from "../../actions/items/actions";
import actionTypes from "../../actions/items/types";

test("should setup subscribe to item by id action object", () => {
  const id = "testid";
  const action = actions.subscribeToItemById(id);
  expect(action).toEqual({
    type: actionTypes.SUBSCRIBE_TO_ITEM_BY_ID,
    payload: { id }
  });
});

test("should setup subscribe to item by id succsess action object", () => {
  const id = "testid";
  const item = { testfield: "testvalue" };
  const action = actions.subscribeToItemByIdSuccess(id, item);
  expect(action).toEqual({
    type: actionTypes.SUBSCRIBE_TO_ITEM_BY_ID_SUCCESS,
    payload: { id, item }
  });
});

test("should setup subscribe to item by id cancel action object", () => {
  const id = "testid";
  const action = actions.subscribeToItemByIdCancel(id);
  expect(action).toEqual({
    type: actionTypes.SUBSCRIBE_TO_ITEM_BY_ID_CANCEL,
    payload: { id }
  });
});

test("should setup subscribe to item by id failure action object", () => {
  const id = "testid";
  const error = { message: "error" };
  const action = actions.subscribeToItemByIdFailure(id, error);
  expect(action).toEqual({
    type: actionTypes.SUBSCRIBE_TO_ITEM_BY_ID_FAILURE,
    payload: { id, error }
  });
});
