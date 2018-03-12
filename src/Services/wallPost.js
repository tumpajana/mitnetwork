function WallPost( postData) {
    console.log(postData);
    let BaseURL ='http://mitapi.memeinfotech.com:5000/user/registration';
    return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
   method: 'POST',
   body: JSON.stringify(postData)
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
   
   
   export default WallPost;