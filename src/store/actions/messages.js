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


