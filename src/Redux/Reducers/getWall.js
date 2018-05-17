import { wallConstants } from '../../constants/wall_constant';
import { createStore, applyMiddleware } from 'redux';
import * as actionCreators from '../Action';


export function getWall(state = [], action) {
    console.log(action)
    switch (action.type) {
        case 'Wall_LIST':
            return action.list
            break;
        case 'SINGLE_POST':
            console.log(action)
            console.log(action.socketPost)
            console.log('socket')
            console.log(state);
            let singlePostArray = [];
            singlePostArray.push(action.socketPost);
            return singlePostArray.concat(state);
        default:
            return state
    }


}