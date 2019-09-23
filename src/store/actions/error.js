import {ADD_ERROR, REMOVE_ERROR} from "../actionTypes";

// two action creators - functions that return actions
// Used to show or remove existing errors
export const addError = error => ({
    type: ADD_ERROR,
    error
});

export const removeError = () => ({
    type: REMOVE_ERROR
});