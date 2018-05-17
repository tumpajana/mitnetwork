import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../Action';

// REDUCER FOR  CLIENT CREATION
export function updateData(state = {}, action) {
    console.log(action)
 switch (action.type) {

        case 'UPDATAEDATA_DONE':
            return action.response   //returning client created data
            break;
        default:
            return state
    }
}