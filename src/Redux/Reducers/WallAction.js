import { wallConstants } from '../../constants/wall_constant';
import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../Action';


export function wall(state = [], action) {
  console.log(action)
  switch (action.type) {
    case wallConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case wallConstants.GETALL_SUCCESS:
      return action.users.result

    case wallConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
      // case wallConstants.SINGLE_POST:
      // return action.post

      
    default:
      return state
  }
}