import { handleActions } from "redux-actions";
import actionTypes from "../actions/items/types";

const itemsDefaultState = {};

export default handleActions(
  {
    [actionTypes.SUBSCRIBE_TO_ITEM_BY_ID]: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          loading: true,
          data: null,
          error: null
        }
      };
    },
    [actionTypes.SUBSCRIBE_TO_ITEM_BY_ID_SUCCESS]: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          loading: false,
          data: action.payload.item,
          error: null
        }
      };
    },
    [actionTypes.SUBSCRIBE_TO_ITEM_BY_ID_CANCEL]: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          loading: false,
          data: null,
          error: null
        }
      };
    },
    [actionTypes.SUBSCRIBE_TO_ITEM_BY_ID_FAILURE]: (state, action) => {
      return {
        ...state,
        [action.payload.id]: {
          loading: false,
          data: null,
          error: action.payload.error
        }
      };
    }
  },
  itemsDefaultState
);
