import { APIURL } from '../urlconfig';

export const wallService = {
    getAll,
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }
    let BaseURL = APIURL + "post/getAllPost?page=" + 0;
    return fetch(BaseURL, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}