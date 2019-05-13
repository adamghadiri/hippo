import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import parse from "html-react-parser";
import { makeItemSelector } from "../selectors/items";
import actions from "../actions/items/actions";
import CommentLoader from "./CommentLoader";
import { formatTime, LONG_LOADER_DELAY } from "./util";

export class Comment extends React.Component {
  componentDidMount() {
    this.props.subscribeToItemById(this.props.itemId);
  }
  componentWillUnmount() {
    this.props.subscribeToItemByIdCancel(this.props.itemId);
  }
  renderComments(data) {
    const { by = "", text = "", time = 0 } = data;
    return (
      text.length > 0 && (
        <div className="list-item comment">
          <h6 className="comment-username">
            @{by} {formatTime(time)}
          </h6>
          <div className="comment-content">{parse(text)}</div>
        </div>
      )
    );
  }
  renderLoader() {
    return <CommentLoader delay={LONG_LOADER_DELAY} />;
  }
  renderErrorMessage() {
    <div className="list-item list-item--message">
      <span>Could not load the comment. Try again later.</span>
    </div>;
  }
  render() {
    const { loading, data, error } = this.props.item;

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && !error && data && this.renderComments(data)}
        {error && this.renderErrorMessage()}
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const itemSelector = makeItemSelector();
  const mapStateToProps = (state, props) => {
    return {
      item: itemSelector(state, props)
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      subscribeToItemById: actions.subscribeToItemById,
      subscribeToItemByIdCancel: actions.subscribeToItemByIdCancel
    },
    dispatch
  );

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Comment);
