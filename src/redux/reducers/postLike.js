import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

// REDUCER FOR  CLIENT CREATION
export function postlike(state = {}, action) {
 switch (action.type) {

        case 'POSTLIKE_DONE':
            return action.response   //returning client created data
            break;
        default:
            return state
    }
}