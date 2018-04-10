
function getUserInfo() {
    return new Promise(function (resolve, reject) {
        if (sessionStorage.getItem('user')) {
            resolve(JSON.parse(sessionStorage.getItem('user')));
        } else {
            reject({});
        }
    });
}

export default getUserInfo;