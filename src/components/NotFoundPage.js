import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="not-found">
    <div className="not-found__item">😕</div>
    <div className="not-found__item">Page not found!</div>
    <Link className="not-found__button" to="/">
      Go home
    </Link>
  </div>
);

export default NotFoundPage;
