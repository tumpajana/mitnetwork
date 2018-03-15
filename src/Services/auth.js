function isAuthenticated() {
    return new Promise((resolve, reject) => {
        if (sessionStorage.getItem('userId')) {
            resolve(true);
        } else {
            reject(false);
        }
    });
}
export default isAuthenticated;