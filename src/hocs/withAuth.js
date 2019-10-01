// this higher order component will ensure a user is logged in before they see the
// following component

// if user is logged in, show component

import React, { Component } from "react";
import { connect } from "react-redux";

// function that gives us a class which will return a component
export default function withAuth(ComponentToBeRendered) {
  class Authenticate extends Component {
    // if user is not logged in, use react router to push to /signin
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push("/signin");
      }
    }
    // if component updates and still not authenticated, push to sign in again
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push("/signin");
      }
    }
    // otherwise, render the new component with any props
    render() {
      return <ComponentToBeRendered {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return {
      isAuthenticated: state.currentUser.isAuthenticated
    };
  }
  return connect(mapStateToProps)(Authenticate);
}
