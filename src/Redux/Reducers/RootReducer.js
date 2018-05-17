import { combineReducers } from 'redux';
// // import { toasts } from '../reducers/toast';
import { getUserProfile } from './GetUserProfile';
import { profilePic } from './ProfilePic';
import { updateData } from './UpdateData';
import { wall } from './WallAction';
import { getWall } from './getWall';


// // reducers list
const rootReducer = combineReducers({
         // toasts,                          // to show toast
        getUserProfile,
        profilePic,
        updateData,
        wall,
        getWall

})


export default rootReducer;