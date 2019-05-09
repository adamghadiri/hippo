import { createActions } from "redux-actions";

export default createActions({
  SUBSCRIBE_TO_ITEM_BY_ID: id => ({ id }),
  SUBSCRIBE_TO_ITEM_BY_ID_SUCCESS: (id, item) => ({ id, item }),
  SUBSCRIBE_TO_ITEM_BY_ID_CANCEL: id => ({ id }),
  SUBSCRIBE_TO_ITEM_BY_ID_FAILURE: (id, error) => ({ id, error })
});
