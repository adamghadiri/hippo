import React from "react";
import { shallow } from "enzyme";
import StoryLoader from "../../components/StoryLoader";

test("should render story loader correctly", () => {
  const wrapper = shallow(<StoryLoader />);
  expect(wrapper).toMatchSnapshot();
});
