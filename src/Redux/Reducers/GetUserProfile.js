import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../Action';

// REDUCER FOR  CLIENT CREATION
export function getUserProfile(state = {}, action) {
 switch (action.type) {

        case 'GETUSERPROFILE_DONE':
            return action.response   //returning client created data
            break;
        default:
            return state
    }
}