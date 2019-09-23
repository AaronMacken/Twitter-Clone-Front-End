import {apiCall} from "../../services/api";
import {addError} from "./error";
import {LOAD_MESSAGES, REMOVE_MESSAGE} from "../actionTypes";

// action creator
export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

// redux thunk - function that returns a dispatch
export const fetchMessages = () => {
    return dispatch => {
        return (apiCall("GET", "/api/messages")
        .then(res => dispatch(loadMessages(res)).catch(err => addError(err.message)));
    }
}
