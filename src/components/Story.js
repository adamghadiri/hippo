import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { makeStorySelector } from "../selectors/stories";
import { makeItemSelector } from "../selectors/items";
import actions from "../actions/stories/actions";
import itemActions from "../actions/items/actions";
import Comment from "./Comment";
import StoryLoader from "./StoryLoader";
import CommentLoader from "./CommentLoader";
import { formatTime, SHORT_LOADER_DELAY, LONG_LOADER_DELAY } from "./util";

export class Story extends React.Component {
  componentDidMount() {
    if (this.props.showRank) {
      this.props.subscribeToStoryByRank(this.props.rank);
    } else if (this.props.showComments) {
      this.props.subscribeToItemById(this.props.itemId);
    }
  }
  componentWillUnmount() {
    if (this.props.showRank) {
      this.props.subscribeToStoryByRankCancel(this.props.rank);
    } else if (this.props.showComments) {
      this.props.subscribeToItemByIdCancel(this.props.itemId);
    }
  }
  renderStoryTitleAndSubtitle(title, by, id, score, time, url) {
    const titleText = this.props.showRank
      ? this.props.rank + 1 + "." + title
      : title;

    const storyTitle = (
      <div>
        {url ? (
          <a className="list-item__title" href={url}>
            {titleText}
          </a>
        ) : (
          <Link
            className="list-item__title"
            to={this.props.showRank ? `story/${id}` : `${id}`}
          >
            {titleText}
          </Link>
        )}
      </div>
    );

    const topCommentsLink = (
      <Link
        className="list-item__subtitle list-item__subtitle--link"
        to={`story/${id}`}
      >
        top 20 comments
      </Link>
    );

    const subtitle = (
      <div className="list-item__subtitle">
        {score} points by @{by} created {formatTime(time)}{" "}
        {this.props.showRank && topCommentsLink}
      </div>
    );

    return (
      <div className="list-item">
        {storyTitle}
        {subtitle}
      </div>
    );
  }
  renderStoryContent(text) {
    return (
      text.length > 0 && (
        <div className="list-item list-item--content">{parse(text)}</div>
      )
    );
  }
  renderComments(kids) {
    return kids.length > 0 ? (
      kids
        .slice(0, 20)
        .map(commentId => <Comment key={commentId} itemId={commentId} />)
    ) : (
      <div className="list-item list-item--message">
        No comments posted for this story yet.
      </div>
    );
  }
  renderStory(data) {
    const {
      title = "",
      by = "",
      id = -1,
      kids = [],
      score = 0,
      time = 0,
      url = "",
      text = ""
    } = data;
    return (
      <div>
        {this.renderStoryTitleAndSubtitle(title, by, id, score, time, url)}
        {this.props.showComments && this.renderStoryContent(text)}
        {this.props.showComments && this.renderComments(kids)}
      </div>
    );
  }
  renderLoader() {
    return this.props.showComments ? (
      <div>
        <StoryLoader delay={LONG_LOADER_DELAY} />
        {[...Array(10)].map((_, i) => (
          <CommentLoader key={i} delay={LONG_LOADER_DELAY} />
        ))}
      </div>
    ) : (
      <StoryLoader delay={SHORT_LOADER_DELAY} />
    );
  }
  renderErrorMessage() {
    return (
      <div className="list-item list-item--message">
        Could not load the story. Try again later.
      </div>
    );
  }
  render() {
    const { loading, data, error } = this.props.showRank
      ? this.props.story
      : this.props.item;

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && !error && data && this.renderStory(data)}
        {error && this.renderErrorMessage()}
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const storySelector = makeStorySelector();
  const itemSelector = makeItemSelector();
  const mapStateToProps = (state, props) => {
    return {
      story: storySelector(state, props),
      item: itemSelector(state, props)
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      subscribeToStoryByRank: actions.subscribeToStoryByRank,
      subscribeToStoryByRankCancel: actions.subscribeToStoryByRankCancel,
      subscribeToItemById: itemActions.subscribeToItemById,
      subscribeToItemByIdCancel: itemActions.subscribeToItemByIdCancel
    },
    dispatch
  );

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Story);
