import {APIURL} from '../urlconfig';

function profilePic(filedata) {
    console.log("file api", filedata);
    let BaseURL = APIURL+'file/upload';
    return new Promise((resolve, reject) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
            //     // 'Content-Type': 'application/json'
            },
            method: 'POST',
            body: filedata
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                resolve(responseJSON);
                console.log("upload");
            })
            .catch((error) => {
                reject(error);
                console.log("error");
            });
    });
}
export default profilePic;