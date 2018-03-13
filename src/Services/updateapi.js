  function updateData( userData) {
    //let BaseURL = '   let BaseURL = 'https://api.thewallscript.com/restful/';';
    console.log(userData);
    let BaseURL ='http://mitapi.memeinfotech.com:5000/user/update';
    return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
   method: 'PUT',
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
   
   
   export default updateData;

  