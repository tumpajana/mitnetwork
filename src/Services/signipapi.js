 function loginData( userData) {
    //let BaseURL = '   let BaseURL = 'https://api.thewallscript.com/restful/';';
    let BaseURL =' http://mitapi.memeinfotech.com:5000/user/login';
    return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
   method: 'POST',
   body: JSON.stringify(userData)
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
   export default loginData