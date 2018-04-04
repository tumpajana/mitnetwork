import {APIURL} from '../urlconfig';

function WallGet(pagenumber) {
  let BaseURL = APIURL+"post/getAllPost?page=" + pagenumber;
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