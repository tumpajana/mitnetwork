function getStates() {
    return new Promise(function (resolve, reject) {
        fetch('./assets/states.json', { method: 'GET' })
            .then(function (response) { return response.json() })
            .then(function (myJson) {
                resolve(myJson);
            });
    });
}

export default getStates;