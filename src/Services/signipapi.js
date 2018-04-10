 import {APIURL} from '../urlconfig';

 function loginData( userData) {
    let BaseURL =APIURL+'user/login';
    return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
   method: 'POST',
   body: JSON.stringify(userData)
   })
   .then((response) => response.json())
   .then((responseJSON) => {
       console.log(responseJSON)
    resolve(responseJSON);
   })
   .catch((error) => {
    reject(error);
   });
   });
   }
   export default loginData

  