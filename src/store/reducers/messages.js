import {LOAD_MESSAGES, REMOVE_MESSAGE} from "../actionTypes";

export const message = (state = [], action) => {
    switch(action.type) {
        case LOAD_MESSAGES: 
            return [...action.messages];
        default:
            return state;
    }
}