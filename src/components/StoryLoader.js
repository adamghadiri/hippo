import React from "react";
import ContentLoader from "react-content-loader";

export default () => (
  <div className="list-item">
    <ContentLoader
      height="33"
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#e2e2e2"
    >
      <rect x="0" y="25%" rx="1" ry="1" width="60%" height="4" />
      <rect x="0" y="75%" rx="1" ry="1" width="40%" height="3" />
    </ContentLoader>
  </div>
);
