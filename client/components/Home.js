import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  return (
    <div className="home-div">
      <h3 className="home-header">Welcome, {username}</h3>
      <p className="home-p">
        Hi {username}, start working on your translating skills with LastWord's simple and intuitive learning method.
      </p>
      <Link
        to={"/prompts"}
        className="home-links">View prompts</Link>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
