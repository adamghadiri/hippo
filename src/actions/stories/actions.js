import { createActions } from "redux-actions";

export default createActions({
  SUBSCRIBE_TO_STORY_BY_RANK: rank => ({ rank }),
  SUBSCRIBE_TO_STORY_BY_RANK_SUCCESS: (rank, story) => ({ rank, story }),
  SUBSCRIBE_TO_STORY_BY_RANK_CANCEL: rank => ({ rank }),
  SUBSCRIBE_TO_STORY_BY_RANK_FAILURE: (rank, error) => ({ rank, error })
});
