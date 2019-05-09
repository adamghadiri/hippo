import { handleActions } from "redux-actions";
import actionTypes from "../actions/stories/types";

const topStoriesDefaultState = {};

export default handleActions(
  {
    [actionTypes.SUBSCRIBE_TO_STORY_BY_RANK]: (state, action) => {
      return {
        ...state,
        [action.payload.rank]: {
          loading: true,
          data: null,
          error: null
        }
      };
    },
    [actionTypes.SUBSCRIBE_TO_STORY_BY_RANK_SUCCESS]: (state, action) => {
      return {
        ...state,
        [action.payload.rank]: {
          loading: false,
          data: action.payload.story,
          error: null
        }
      };
    },
    [actionTypes.SUBSCRIBE_TO_STORY_BY_RANK_CANCEL]: (state, action) => {
      return {
        ...state,
        [action.payload.rank]: {
          loading: false,
          data: null,
          error: null
        }
      };
    },
    [actionTypes.SUBSCRIBE_TO_STORY_BY_RANK_FAILURE]: (state, action) => {
      return {
        ...state,
        [action.payload.rank]: {
          loading: false,
          data: null,
          error: action.payload.error
        }
      };
    }
  },
  topStoriesDefaultState
);
