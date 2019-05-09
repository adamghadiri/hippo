import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import parse from "html-react-parser";
import { itemSelector } from "../selectors/items";
import actions from "../actions/items/actions";
import CommentLoader from "./CommentLoader";
import { formatTime } from "./util";

export class Comment extends React.Component {
  componentDidMount() {
    this.props.subscribeToItemById(this.props.itemId);
  }
  componentWillUnmount() {
    this.props.subscribeToItemByIdCancel(this.props.itemId);
  }
  render() {
    const { loading, data, error } = this.props.item;

    let show = () => {};
    if (data) {
      const { by, text, time } = data;
      show = () =>
        text && (
          <div className="list-item comment">
            <h6 className="comment-username">
              @{by} {formatTime(time)}
            </h6>
            <div className="comment-content">{parse(text)}</div>
          </div>
        );
    }
    return (
      <div>
        {loading && <CommentLoader />}
        {!loading && !error && show()}
        {error && (
          <div className="list-item list-item--message">
            <span>Could not load the comment. Try again later.</span>
          </div>
        )}
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  return (state, props) => {
    return { item: itemSelector(state, props) };
  };
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
