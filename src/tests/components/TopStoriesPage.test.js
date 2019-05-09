import React from "react";
import { shallow } from "enzyme";
import TopStoriesPage from "../../components/TopStoriesPage";

test("should render top stories page correctly", () => {
  const wrapper = shallow(<TopStoriesPage />);
  expect(wrapper).toMatchSnapshot();
});
