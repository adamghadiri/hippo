import { createSelector } from "reselect";

const getStory = (state, props) => state.stories[props.rank];

const makeStorySelector = () => createSelector(
  getStory,
  story =>
    story
      ? story
      : {
          loading: false,
          data: null,
          error: null
        }
);

export { getStory, makeStorySelector };
