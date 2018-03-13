 function profilePic( userData) {
    //let BaseURL = '   let BaseURL = 'https://api.thewallscript.com/restful/';';
    let BaseURL ='http://mitapi.memeinfotech.com:5000/file/upload';
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
   export default profilePic