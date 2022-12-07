import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const NotFoundPage = (props) => {
  return (
    <div>
      <h3>Oops! Looks like the page you're looking for doesn't exist.</h3>
    </div>
  );
};

export default NotFoundPage;
