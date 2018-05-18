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
            console.log(action.socketPost)
            console.log(action.socketPost._id)
            
            console.log('.......socket......')
            let singlePostArray = [];
            singlePostArray.push(action.socketPost);

            return singlePostArray.concat(state);
            break;

        case 'SINGLE_COMMENT':
            console.log(action.socketcomment)
            console.log(action.socketcomment._id)  //postID
            console.log(action.socketcomment.comments[action.socketcomment.comments.length-1]._id)   //commentId                               
            console.log('.......socket......')
            // let newarray1 = this.socketcomment.comments.map(function (item, index) {
            //     return {
            //         commentId: item._id,
            //     }
            // })
            // let index = newarray1.findIndex(x => x._id );
            //         console.log(index);
            //         console.log(newarray1[index]);
            let singleArrayComment = [];
            singleArrayComment.push(action.socketcomment)
            return singleArrayComment.concat(state);
            

        default:
            return state
    }


}