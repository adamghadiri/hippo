import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <img className="header__logo" src="/images/hacker-news-logo.jpg" />
        <Link className="header__title" to="/">
          Hacker News
        </Link>
      </div>
    </div>
  </header>
);
