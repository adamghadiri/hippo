import React from "react";
import ContentLoader from "react-content-loader";
import withDelay from "./withDelay";

export default props => {
  const loader = () => (
    <div className="list-item">
      <ContentLoader
        height="70"
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#e2e2e2"
      >
        <rect x="0" y="10%" rx="1" ry="1" width="25%" height="3" />
        <rect x="0" y="40%" rx="1" ry="1" width="85%" height="3" />
        <rect x="0" y="60%" rx="1" ry="1" width="80%" height="3" />
        <rect x="0" y="80%" rx="1" ry="1" width="40%" height="3" />
      </ContentLoader>
    </div>
  );
  const DelayedLoader = withDelay(loader, props.delay);
  return <DelayedLoader />;
};
