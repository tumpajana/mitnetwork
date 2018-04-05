import {APIURL} from '../urlconfig';

function commentPost( commentData) {
    console.log(commentData);
    let BaseURL =APIURL+'post/comment';
    return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
   method: 'PUT',
   body: JSON.stringify(commentData)
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
   
   
   export default commentPost;
