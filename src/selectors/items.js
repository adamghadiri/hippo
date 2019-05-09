import { createSelector } from "reselect";

const getItem = (state, props) => state.items[props.itemId];

// const itemSelector = createSelector(
//   getItem,
// item =>
//   item
//     ? item
//     : {
//         loading: false,
//         data: null,
//         error: null
//       }
// );

const itemSelector = (state, props) =>
  getItem(state, props) || {
    loading: false,
    data: null,
    error: null
  };

export { getItem, itemSelector };
