import actions from "../../actions/stories/actions";
import actionTypes from "../../actions/stories/types";

test("should setup subscribe story by rank action object", () => {
  const rank = 4;
  const action = actions.subscribeToStoryByRank(rank);
  expect(action).toEqual({
    type: actionTypes.SUBSCRIBE_TO_STORY_BY_RANK,
    payload: { rank }
  });
});

test("should setup subscribe story by rank succsess action object", () => {
  const rank = 4;
  const story = { testfield: "testvalue" };
  const action = actions.subscribeToStoryByRankSuccess(rank, story);
  expect(action).toEqual({
    type: actionTypes.SUBSCRIBE_TO_STORY_BY_RANK_SUCCESS,
    payload: { rank, story }
  });
});

test("should setup subscribe story by rank cancel action object", () => {
  const rank = 4;
  const action = actions.subscribeToStoryByRankCancel(rank);
  expect(action).toEqual({
    type: actionTypes.SUBSCRIBE_TO_STORY_BY_RANK_CANCEL,
    payload: { rank }
  });
});

test("should setup subscribe story by rank failure action object", () => {
  const rank = 4;
  const error = { message: "error" };
  const action = actions.subscribeToStoryByRankFailure(rank, error);
  expect(action).toEqual({
    type: actionTypes.SUBSCRIBE_TO_STORY_BY_RANK_FAILURE,
    payload: { rank, error }
  });
});
