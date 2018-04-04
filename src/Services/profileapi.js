import {APIURL} from '../urlconfig';

function getUserProfile( id) {
    let BaseURL =APIURL+'user/getSingle?userId='+id;
    return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
         headers: {
         'Accept': 'application/json',         
           'Content-Type': 'application/json'        },
   method: 'GET'
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
   export default getUserProfile