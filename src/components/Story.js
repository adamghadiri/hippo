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
import uuid from "uuid/v1";

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
  render() {
    const { loading, data, error } = this.props.showRank
      ? this.props.story
      : this.props.item;

    let showStory = () => {},
      showStoryContent = () => {},
      showComments = () => {};

    if (data) {
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

      showStory = () => {
        const titleToShow = (
          <p className="list-item__title">
            {this.props.showRank ? this.props.rank + 1 + "." + title : title}
          </p>
        );

        const commentsLink = (
          <Link
            className="list-item__subtitle list-item__subtitle--link"
            to={`story/${id}`}
          >
            <span>top 20 comments</span>
          </Link>
        );

        const subtitle = (
          <div className="list-item__subtitle">
            {score} points by @{by} created {formatTime(time)}{" "}
            {this.props.showRank && commentsLink}
          </div>
        );

        return (
          <div className="list-item">
            <div>
              {url ? (
                <div>
                  <div className="list-item__title">
                    <a href={url}>{titleToShow}</a>
                  </div>
                </div>
              ) : (
                <Link to={this.props.showRank ? `story/${id}` : `${id}`}>
                  {titleToShow}
                </Link>
              )}
            </div>
            {subtitle}
          </div>
        );
      };

      showStoryContent = () =>
        text.length > 0 && (
          <div className="list-item--content">{parse(text)}</div>
        );

      showComments = () =>
        kids.length > 0 ? (
          kids
            .slice(0, 20)
            .map(commentId => <Comment key={commentId} itemId={commentId} />)
        ) : (
          <div className="list-item list-item--message">
            <span>No comments posted for this story yet.</span>
          </div>
        );
    }

    return (
      <div>
        {loading &&
          (this.props.showComments ? (
            <div >
              <StoryLoader delay={LONG_LOADER_DELAY} />
              {[...Array(20)].map((_, i) => (
                <CommentLoader key={i} delay={LONG_LOADER_DELAY} />
              ))}
            </div>
          ) : (
            <StoryLoader delay={SHORT_LOADER_DELAY} />
          ))}
        {!loading &&
          !error &&
          (this.props.showComments ? (
            <div>
              {showStory()}
              {showStoryContent()}
              {showComments()}
            </div>
          ) : (
            showStory()
          ))}
        {error && (
          <div className="list-item list-item--message">
            <span>Could not load the story. Try again later.</span>
          </div>
        )}
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
