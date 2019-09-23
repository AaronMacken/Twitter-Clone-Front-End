import React, { Component } from 'react';
import {Provider} from "react-redux";
import {configureStore} from "../store";
import {BrowserRouter as Router} from "react-router-dom";

import Navbar from "./Navbar";
import Main from "./Main";
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';

// decodes the payload of the jwt object 
import jwtDecode from "jwt-decode";

// Component placed in the containers directory because it contains some redux state
// Store is created using the configureStore function from the store index file
// Provider connects the react application with the redux store

const store = configureStore();

// see if a token already exists when page is refreshed
// jwtToken comes from the variable created in actions/auth file
if(localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    // prevent someone from manually tampering with the key of jwtToken in localStorage
    try {
        // log user in with decoded jwt token coming from local storage
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch(e) {
        // if jwtToken has been tampered with, force logout
        store.dispatch(setCurrentUser({}));
    }
}

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="onboarding">
                <Navbar />
                <Main />
            </div>
        </Router>
    </Provider>
)

export default App;
