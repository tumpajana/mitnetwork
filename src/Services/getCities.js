function getCities(state) {
    return new Promise(function (resolve, reject) {
        fetch('./assets/cities.json', { method: 'GET' })
            .then(function (response) { return response.json() })
            .then(function (myJson) {
                resolve(myJson.filter((item) => {
                    return item.state == state;
                }));
            });
    });
}

export default getCities;