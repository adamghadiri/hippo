import React from "react";
import { shallow } from "enzyme";
import { Story } from "../../components/Story";
import { Link } from "react-router-dom";

const props = {
  subscribeToStoryByRank: jest.fn(),
  subscribeToItemById: jest.fn(),
  subscribeToStoryByRankCancel: jest.fn(),
  subscribeToItemByIdCancel: jest.fn()
};

const story = {
  loading: false,
  data: {
    title: "testTitle",
    by: "TestAuthor",
    id: 1,
    kids: [3, 4, 5],
    score: 123,
    time: 31321,
    url: "http://example.com",
    text: "sometext"
  },
  error: null
};

test("should render Story by rank and without comments correctly", () => {
  const wrapper = shallow(
    <Story showRank={true} story={story} rank={4} {...props} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("shoud handle commentsLink in Story by rank correctly", () => {
  const wrapper = shallow(
    <Story showRank={true} story={story} rank={4} {...props} />
  );
  const link = wrapper.find(".list-item__subtitle--link").prop("to");
  expect(link).toBe(`story/${story.data.id}`);
});

test("shoud handle storyLink in Story by rank correctly", () => {
  const {url, ...storyWithNoUrl} = story
  const wrapper = shallow(
    <Story showRank={true} story={storyWithNoUrl} rank={4} {...props} />
  );
  const link = wrapper.find(Link).prop("to");
  expect(link).toBe(`story/${story.data.id}`);
});

test("should render Story with comments correctly", () => {
  const wrapper = shallow(
    <Story showComments={true} itemId="test-story-id" item={story} {...props} />
  );
  expect(wrapper).toMatchSnapshot();
});
