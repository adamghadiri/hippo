const getItem = (state, props) => state.items[props.itemId];

const itemSelector = (state, props) =>
  getItem(state, props) || {
    loading: false,
    data: null,
    error: null
  };

export { getItem, itemSelector };
