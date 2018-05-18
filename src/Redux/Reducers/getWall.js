import { wallConstants } from '../../constants/wall_constant';
import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../Action';


export function getWall(state = [], action) {
    console.log(action)
    switch (action.type) {
        case 'Wall_LIST':
            return action.list
            break;
        // case 'SINGLE_POST':
        //     console.log(action)
        //     console.log(action.socketPost)
        //     console.log('.......socket......')
        //     let singlePostArray = [];
        //     singlePostArray.push(action.socketPost);
        //     return singlePostArray.concat(state);
        //     break;
        //     case 'SINGLE_COMMENT':
        //     console.log(action.socketcomment)
        //     console.log('.......socket......')  
        //     let singleArrayComment =[];
        //     singleArrayComment.push(action.socketcomment)
        default:
            return state
    }


}