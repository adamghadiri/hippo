import React from "react";
import Story from "./Story";

export default props => (
  <div className="content-container list-body">
    <Story showComments={true} itemId={props.match.params.id} />
  </div>
);
