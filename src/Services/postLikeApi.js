import {APIURL} from '../urlconfig';

function postLike( filedata) {
    let BaseURL =APIURL+'post/like';
    return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
   method: 'PUT',
   body: JSON.stringify(filedata)
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
   export default postLike