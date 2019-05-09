import React from "react";
import Story from "./Story";

export default (props) => (
  <Story showComments={true} itemId={props.match.params.id} />
);
