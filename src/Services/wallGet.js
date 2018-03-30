function WallGet(pagenumber) {
  let BaseURL = " http://mitapi.memeinfotech.com:5000/post/getAllPost?page=" + pagenumber;
  return new Promise((resolve, reject) => {
    fetch(BaseURL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
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


export default WallGet;