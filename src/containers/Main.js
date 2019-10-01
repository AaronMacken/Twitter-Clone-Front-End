import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import {authUser} from "../store/actions/auth";
import {removeError} from "../store/actions/error";
import withAuth from "../hocs/withAuth";
import MessageForm from "../containers/MessageForm";

const Main = props => {
  // destructure props coming from mapStateToProps (at the bottom of the page)
  const {authUser, errors, removeError, currentUser} = props;
  return (
    <div className="container">
      <Switch>
        {/* Render a component along with the react router props */}
        <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props} />} />

        <Route
          exact
          path="/signin"
          render={props => {
            return (
              <AuthForm
              removeError={removeError}
              // errors coming from mapStateToProps
              errors={errors}
              onAuth={authUser}
                buttonText="Log in"
                heading="Welcome Back."
                {...props}
              />
            );
          }}
        />
        {/* This route contains a signUp prop - used for displaying additional fields on the authform component */}
        <Route
          exact
          path="/signup"
          render={props => {
            return (
              <AuthForm
              removeError={removeError}
              errors={errors}
              onAuth={authUser}
                signUp
                buttonText="Sign me up!"
                heading="Join Warbler today."
                {...props}
              />
            );
          }}
        />
        {/* when this path is reached, a higher order component will be loaded 
        (a function that wraps a component) */}
        <Route path="/users/:id/messages/new" component={withAuth(MessageForm)} />
      </Switch>
    </div>
  );
};

// Redux state now made vailable as props
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser, 
    errors: state.errors
  };
}

// pass in auth user as mapDispatchToProps
export default withRouter(
  connect(
    mapStateToProps,
    {authUser, removeError}
  )(Main)
);
