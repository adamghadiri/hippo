import { createSelector } from "reselect";

const getStory = (state, props) => state.stories[props.rank];

const storySelector = (state, props) =>
  getStory(state, props) || {
    loading: false,
    data: null,
    error: null
  };

export { getStory, storySelector };
