import React from "react";
import { shallow } from "enzyme";
import StoryPage from "../../components/StoryPage";

test("should render story page correctly", () => {
  const match = { params: { id: "testItemId" } };
  const wrapper = shallow(<StoryPage match={match} />);
  expect(wrapper).toMatchSnapshot();
});
