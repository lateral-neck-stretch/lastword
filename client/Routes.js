import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import UserTranslatePage from "./components/UserTranslatePage/UserTranslatePage";
import PromptSelection from "./components/PromptSelection";
import Watson from "./Watson";
import UserProfile from "./components/UserProfile/UserProfile";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            {/* <Route path="/watson" component={Watson} /> */}
            <Route path="/home" component={Home} />
            <Route path="/prompts/:id" component={UserTranslatePage} />
            <Route path="/prompts" component={PromptSelection} />
            <Route exact path="/myprofile" component={UserProfile} />
            {/* <Route path="/myprofile" component={Home} /> */}
            <Route path="*" component={NotFoundPage} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/watson" component={Watson} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
