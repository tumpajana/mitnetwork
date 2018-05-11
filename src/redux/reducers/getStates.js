import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

// REDUCER FOR  CLIENT CREATION
export function getstates(state = {}, action) {
 switch (action.type) {

        case 'GETSTATE-DONE':
            return action.response   //returning client created data
            break;
        default:
            return state
    }
}