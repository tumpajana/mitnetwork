function FacebookloginData(FacebookData) {
    //let BaseURL = '   let BaseURL = 'https://api.thewallscript.com/restful/';';
    let BaseURL = 'http://mitapi.memeinfotech.com:5000/user/socialRegistration';
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