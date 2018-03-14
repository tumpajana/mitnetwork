function commentPost( commentData) {
    //let BaseURL = '   let BaseURL = 'https://api.thewallscript.com/restful/';';
    console.log(commentData);
    let BaseURL ='http://mitapi.memeinfotech.com:5000/post/comment ';
    return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
   method: 'POST',
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
