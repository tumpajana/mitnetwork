function getStates() {
    return new Promise(function (resolve, reject) {
        fetch('/assets/states.json', { method: 'GET' })
            .then(function (response) {
                return response.json()
            }, function (error) {
                return error.json()
            })
            .then(function (myJson) {
                resolve(myJson);
            }, function (error) {
                reject(error);
            });
    });
}

export default getStates;