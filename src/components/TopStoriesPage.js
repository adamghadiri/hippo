import React from "react";
import Story from "./Story";

export default () => (
  <div className="content-container">
    <h3 className="list-header">Popular updates</h3>
    <div className="list-body">
      {[...Array(10).keys()].map(rank => (
        <Story key={rank} showRank={true} rank={rank} />
      ))}
    </div>
  </div>
);
        