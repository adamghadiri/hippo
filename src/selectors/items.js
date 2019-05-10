import { createSelector } from "reselect";

const getItem = (state, props) => state.items[props.itemId];

const makeItemSelector = () => createSelector(
  getItem,
  item =>
    item
      ? item
      : {
          loading: false,
          data: null,
          error: null
        }
);

export { getItem, makeItemSelector };
