import { getStory, storySelector } from "../../selectors/stories";

test("get story should work", () => {
  const story = {
    loading: false,
    data: [{ testId: "testdata" }],
    error: null
  };
  const state = {
    stories: {
      4: story
    }
  };
  const props = {
    rank: 4
  };
  const result = getStory(state, props);
  expect(result).toEqual(story);
});

test("get story should work with no data in store", () => {
  const props = {
    rank: 4
  };
  const result = getStory({ stories: {} }, props);
  expect(result).toEqual(undefined);
});

test("story selector should work", () => {
  const story = {
    loading: false,
    data: [{ testId: "testdata" }],
    error: null
  };
  const state = {
    stories: {
      4: story
    }
  };
  const props = {
    rank: 4
  };
  const result = storySelector(state, props);
  expect(result).toEqual(story);
});

test("story selector should work with no data in store", () => {
  const props = {
    rank: 4
  };
  const result = storySelector({ stories: {} }, props);
  expect(result).toEqual({
    loading: false,
    data: null,
    error: null
  });
});
