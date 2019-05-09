import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopStoriesPage from "../components/TopStoriesPage";
import StoryPage from "../components/StoryPage";
import Header from "../components/Header";
import NotFoundPage from "../components/NotFoundPage";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={TopStoriesPage} exact={true} />
        <Route path="/story/:id" component={StoryPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
