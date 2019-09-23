import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false, // hopefully be true when user is logged in
  user: {} // all user info when logged in
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        // checks to see if the object has key's
        // (acting as a boolean value for user data being present)
        isAuthenticated: Object.keys(action.user).length > 0,
        user: action.user
      };
    default:
      return state;
  }
};
