import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../action';

// REDUCER FOR  CLIENT CREATION
export function wallget(state = {}, action) {
 switch (action.type) {

        case 'WALLGET_DONE':
            return action.response   //returning client created data
            break;
        default:
            return state
    }
}