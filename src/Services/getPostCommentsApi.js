import {APIURL} from '../urlconfig';

function getPostComments( postid) {
    //let BaseURL = '   let BaseURL = 'https://api.thewallscript.com/restful/';';
    console.log(postid);
    let BaseURL =APIURL+'post/getCommentByPostId?postId='+postid;
    return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
   method: 'GET',
   })
   .then((response) => response.json())
   .then((responseJSON) => {
    resolve(responseJSON);
   })
   .catch((error) => {
    reject(error);
   });
   });
   }
   
   
   export default getPostComments;