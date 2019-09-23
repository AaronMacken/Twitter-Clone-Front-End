import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import {addError, removeError} from "./error";

// action creator that accepts a user
// this is what is dispatched and sent to the redux reducer
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

// create a redux thunk then dispatch the action
export function logout() {
  return dispatch => {
    // clear the jwt from local storage
    localStorage.clear();
    // remove the token from all future requests
    setAuthorizationToken(false);
    // call set current user with an empty object, thus dropping all user data and setting isAuthenticated to false
    // once isAuthenticated becomes false, the user is no longer authenticated and the page will re render
    // to display unAuthenticated user content
    dispatch(setCurrentUser({}));
  }
}


// redux thunk
// function that is actually used to log a user in
// accepts a type (signup or signin) and some user data that comes in from the request
// return a function with dispatch using redux thunk
// use generic apiCall function
export function authUser(type, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      // destructure the data coming from the axios request in the data sub object
      // (data.token, data...user)
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...responseData }) => {
          // mark a user as logged in
          localStorage.setItem("jwtToken", token);
          // set auth token in headers
          setAuthorizationToken(token);
          // create the current user in the redux store
          dispatch(setCurrentUser(responseData));
          // remove any previous errors
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          // dispatch an error with the message that is coming from our server
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}
