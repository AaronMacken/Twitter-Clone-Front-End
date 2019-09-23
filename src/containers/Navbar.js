import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../images/warbler-logo.png";
import { logout } from "../store/actions/auth";

class Navbar extends Component {
  logout = e => {
    e.preventDefault();
    // logout is available as a prop after we import the function, and include it in mapDispatchToProps
    this.props.logout();
  };
  render() {
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            {/* Links act as anchor tags */}
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Warbler Home" />
            </Link>
          </div>
          {/* currentUser is accessible as props, coming from redux state via mapStateToProps */}
          {/* Display different nav links based on whether a user is logged in or not */}
          {this.props.currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                {/* Link to create a new message, available to currentUser */}
                {/* Takes user to a route that contians a form to create a new message */}
                <Link
                  to={`/users/${this.props.currentUser.user.id}/messages/new`}
                >
                  New Message
                </Link>
              </li>
              {/* Log user out */}
              {/* When a user is logged in, a token is placed in local storage */}
              {/* Log out will remove that token from local storage */}
              <li>
                <a onClick={this.logout}>Log Out</a>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <Link to="/signin">Log in</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

// current user will be placed on props
// value will be from state - all data pertaining to current user
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

// Connect the navbar to the redux store
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
