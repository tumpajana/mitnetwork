function getUserProfile( id) {
    //let BaseURL = '   let BaseURL = 'https://api.thewallscript.com/restful/';';
    let BaseURL =' http://mitapi.memeinfotech.com:5000/user/getSingle';
    return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
         headers: {
         'Accept': 'application/json',         
           'Content-Type': 'application/json'        },
   method: 'GET',
   query: JSON.stringify(id)
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