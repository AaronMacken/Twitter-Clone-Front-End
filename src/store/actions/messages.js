import { apiCall } from "../../services/api";
import { addError } from "./error";
import { LOAD_MESSAGES, REMOVE_MESSAGE } from "../actionTypes";

// action creator
export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

// redux thunk - function that returns a dispatch
export const fetchMessages = () => {
    return dispatch => {
        return (apiCall("get", "/api/messages")
            .then(res => {
                console.log(res);
                dispatch(loadMessages(res))
            })
            .catch(err => {
                dispatch(addError(err.message))
            })
        )
    }
}

// redux thunk for creating a new message, takes some text and returns a dispatch and some redux state
// to add a new message
// -make request to api
// -add that message to the DB
// -reload the message list
// -run loadMessages
export const postNewMessage = text => (dispatch, getState) => {
    // get current user's id by destructuring currentUser from getState
    let {currentUser} = getState();
    const id = currentUser.user.id;
    // use that id in the api call
    return apiCall("post", `/api/users/${id}/messages`, { text })
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
}

