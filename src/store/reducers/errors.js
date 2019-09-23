// bring in action types
import {ADD_ERROR, REMOVE_ERROR} from "../actionTypes";


// some default state is created in the parameter
export default (state={message: null}, action) => {
    switch(action.type){
        case ADD_ERROR: 
        return {...state, message: action.error};
        case REMOVE_ERROR: 
            return {...state, message: null};
        default: 
            return state;
    }
}
