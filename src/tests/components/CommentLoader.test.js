import React from "react";
import { shallow } from "enzyme";
import CommentLoader from "../../components/CommentLoader";

test("should render comment loader correctly", () => {
  const wrapper = shallow(<CommentLoader />);
  expect(wrapper).toMatchSnapshot();
});
