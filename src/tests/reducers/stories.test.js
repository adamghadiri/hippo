import actionTypes from "../../actions/stories/types";
import storiesReducer from "../../reducers/stories";

test("should set default state", () => {
  const state = storiesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("should reduce subscribe to story by rank properly", () => {
  const rank = 4;
  const action = {
    type: actionTypes.SUBSCRIBE_TO_STORY_BY_RANK,
    payload: { rank }
  };
  const state = storiesReducer({}, action);
  expect(state).toEqual({
    [action.payload.rank]: {
      loading: true,
      data: null,
      error: null
    }
  });
});

test("should reduce subscribe to story by rank success properly", () => {
  const rank = 4;
  const story = { field: "value" };
  const action = {
    type: actionTypes.SUBSCRIBE_TO_STORY_BY_RANK_SUCCESS,
    payload: { rank, story }
  };
  const state = storiesReducer({}, action);
  expect(state).toEqual({
    [action.payload.rank]: {
      loading: false,
      data: action.payload.story,
      error: null
    }
  });
});

test("should reduce subscribe to story by rank cancel properly", () => {
  const rank = 4;
  const action = {
    type: actionTypes.SUBSCRIBE_TO_STORY_BY_RANK_CANCEL,
    payload: { rank }
  };
  const state = storiesReducer({}, action);
  expect(state).toEqual({
    [action.payload.rank]: {
      loading: false,
      data: null,
      error: null
    }
  });
});

test("should reduce subscribe to story by rank failure properly", () => {
  const rank = 4;
  const error = { message: "error" };
  const action = {
    type: actionTypes.SUBSCRIBE_TO_STORY_BY_RANK_FAILURE,
    payload: { rank }
  };
  const state = storiesReducer({}, action);
  expect(state).toEqual({
    [action.payload.rank]: {
      loading: false,
      data: null,
      error: action.payload.error
    }
  });
});
