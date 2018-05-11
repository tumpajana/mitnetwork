import { combineReducers } from 'redux';
// import { toasts } from '../reducers/toast';
import { commonpost } from './commentPost';
import { facebooklogin } from './FacebookloginData';
import { getcities } from './GetCities';
import { getpostcomments } from './GetPostComments';
import { getstates } from './getStates';
import { getuserprofile } from './getUserProfile';
import { postlike } from './postLike';
import { profilepic } from './profilePic';
import { updatedata } from './UpdateData';
import { wallget } from './WallGet';
import { wallpost } from './WallPost';

// reducers list
const rootReducer = combineReducers({
    // toasts,                          // to show toast
    // loginCreate,    
    commonpost, 
    facebooklogin,
    getcities,
    getpostcomments,
    getstates,
    getuserprofile,
    postlike,
    profilepic,
    updatedata,
    wallget,
    wallpost

})


export default rootReducer;