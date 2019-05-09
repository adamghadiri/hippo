import React from "react";
import { shallow } from "enzyme";
import { Comment } from "../../components/Comment";

const props = {
  subscribeToItemById: jest.fn(),
  subscribeToItemByIdCancel: jest.fn()
};

const comment = {
  loading: false,
  data: {
    by: "TestAuthor",
    time: 31321,
    text: "sometext"
  },
  error: null
};

test("should render Comment by id correctly", () => {
  const wrapper = shallow(
    <Comment itemId="test-item-id" item={comment} {...props} />
  );
  expect(wrapper).toMatchSnapshot();
});
