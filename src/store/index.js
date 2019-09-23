import rootReducer from "./reducers";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

// function used to create the redux store
// accepts the root reducer to manage redux store logic
// accepts compose-> applyMiddleware-> thunk in order to write action creators that return functions for async code

export function configureStore() {
    const store = createStore(rootReducer,
        compose(applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
        )    
    );

    return store;
}