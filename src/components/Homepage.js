import React from "react";
import { Link } from "react-router-dom";

// destructure currentUser from props
const Homepage = ({ currentUser }) => {
  // if current user is not authenticated (coming down as props from main component, which was defined as default state in the root reducer)
  if (!currentUser.isAuthenticated) {
    return (
      <div className="home-hero">
        <h1>Whats happening?</h1>
        <h2>New to Warbler?</h2>
        <Link to="/signup" className="btn btn-primary">
          Sign up here
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h1>You made it!</h1>
    </div>
  );
};

export default Homepage;
