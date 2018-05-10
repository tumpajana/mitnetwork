import { wallConstants } from '../constants';

export function wall(state = [], action) {
  switch (action.type) {
    case wallConstants.GETALL_SUCCESS:
      return state.concat(action.users.result) 

    case wallConstants.GETALL_FAILURE:
      return [];
    default:
      return state
  }
}