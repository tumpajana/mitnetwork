import {APIURL} from '../urlconfig';

function FacebookloginData(FacebookData) {
    let BaseURL = APIURL+'user/socialRegistration';
    return new Promise((resolve, reject) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(FacebookData)
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
export default FacebookloginData