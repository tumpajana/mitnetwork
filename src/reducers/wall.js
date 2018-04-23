import { wallConstants } from '../constants';

export function wall(state = [], action) {
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
    default:
      return state
  }
}