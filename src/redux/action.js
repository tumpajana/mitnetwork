import {APIURL} from '../urlconfig';
import {push} from 'react-router-redux';
import {Button, notification} from 'antd';

const openNotification = (type, content) => {
    notification.open({message: type, description: content});
};

//FUNCTION FOR API CALL FOR GETTING CLIENT LIST AND DISPATCHING ACTION
export function Login(data,path) {
    console.log(data)
    console.log(APIURL)
    let BaseURL = APIURL + 'user/login';
    return (dispatch) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                if (!responseJSON.error) {
                    path.push('/layout/profile',);
                    openNotification('success', 'Login successfully done');
                }
            })
            .catch((error) => {
                openNotification(error, 'Login failed')
            });

    }
}


export function Register(data) {
    console.log(data)
    console.log(APIURL)
    let BaseURL = APIURL + 'user/registration';
    return (dispatch) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((responseJSON) => {
            console.log(responseJSON)
            if (!responseJSON.error) {
                // this.props.history.push({     pathname: '/layout/profile', });
                openNotification('success', 'Registration successfully done');
            }

        }).catch((error) => {
            openNotification(error, 'Registration failed')
        });
    }
}

export function updateData(data, location) {
    console.log(data)
    console.log(APIURL)
    let BaseURL = APIURL + 'user/update';
    return (dispatch) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((responseJSON) => {
            console.log(responseJSON)
            if (!responseJSON.error) {
                location.push('/crop');
                // path.push('/layout/profile'); openNotification('success', 'Profile updated
                // successfully');
            } else {
                // openNotification('warning', 'Profile not updated successfully');
            }

        }).catch((error) => {
            // openNotification('warning', 'Login failed');
        });
    }
}

// UPDATE  ACTION
function updateApi(list) {
    return {
        type: "UPDATAEDAT_DONE",
        list

    }
}

export function WallPost(postData) {
    console.log(postData);
    console.log(APIURL);
    let BaseURL = APIURL + 'post/socialPost';
    return (dispatch) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(postData)
        }).then((response) => response.json()).then((responseJSON) => {
        }).catch((error) => {
        });
    }
}

// UPDATE  ACTION
function wallpostapi(list) {
    return {
        type: "WALLPOST_DONE",
        list

    }
}


export function WallGet(pagenumber) {
    let BaseURL = APIURL + "post/getAllPost?page=" + pagenumber;
    return (dispatch) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then((response) => response.json()).then((responseJSON) => {
        }).catch((error) => {
        });
    }
}
// UPDATE  ACTION
function wallgetapi(list) {
    return {
          type: "WALLGET_DONE",
          list
  
      }
  }

export function FacebookloginData(FacebookData) {
    let BaseURL = APIURL + 'user/socialRegistration';
    return (dispatch) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(FacebookData)
        }).then((response) => response.json()).then((responseJSON) => {
            console.log(responseJSON)
        }).catch((error) => {
        });
    }
}

// UPDATE  ACTION
function facebooklogindata(list) {
    return {
        type: "FACEBOOKLOGIN_DONE",
        list

    }
}
export function profilePic(filedata) {
    console.log("file api", filedata);
    let BaseURL = APIURL + 'file/upload';
    return (dispatch) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: filedata
        }).then((response) => response.json()).then((responseJSON) => {

            console.log("upload");
        }).catch((error) => {
            console.log("error");
        });
    }
}

// UPDATE  ACTION
function profilepicapi(list) {
    return {
        type: "LOGIN-DONE",
        list

    }
}
export function getUserProfile(id) {
    let BaseURL = APIURL + 'user/getSingle?userId=' + id;
    return (dispatch) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }).then((response) => response.json()).then((responseJSON) => {
        }).catch((error) => {
        });
    }
}

// UPDATE  ACTION
function getuserapi(list) {
    return {
        type: "GETUSERPROFILE_DONE",
        list

    }
}
export function postLike(filedata) {
    let BaseURL = APIURL + 'post/like';
    return (dispatch) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(filedata)
        }).then((response) => response.json()).then((responseJSON) => {
        }).catch((error) => {
        });
    }
}

// UPDATE  ACTION
function postlikeapi(list) {
    return {
        type: "POSTLIKE_DONE",
        list

    }
}
export function commentPost(commentData) {
    console.log(commentData);
    let BaseURL = APIURL + 'post/comment';
    return (dispatch) => {
        fetch(BaseURL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(commentData)
        }).then((response) => response.json()).then((responseJSON) => {
        }).catch((error) => {
        });
    }
}

// UPDATE  ACTION
function commonpostapi(list) {
    return {
        type: "COMMENTPOST_DONE",
        list

    }
}
export function getUserInfo() {
    return (dispatch) => {
        return new Promise(function (resolve, reject) {
            if (sessionStorage.getItem('user')) {
                resolve(JSON.parse(sessionStorage.getItem('user')));
            } else {
                reject({});
            }
        });
    }
}

// UPDATE  ACTION
function wall(list) {
    return {
        type: "LOGIN-DONE",
        list

    }
}
export function getStates() {
    return (dispatch) => {
        fetch('/assets/states.json', {method: 'GET'})
            .then(function (response) {
                return response.json()
            }, function (error) {
                return error.json()
            })
            .then(function (myJson) {
            }, function (error) {
            });
    }
}

// UPDATE  ACTION
function wall(list) {
    return {
        type: "LOGIN-DONE",
        list

    }
}
// export function getPostComments(postid) {
//     console.log(postid);
//     let BaseURL = APIURL + 'post/getCommentByPostId?postId=' + postid;
//     return (dispatch) => {
//         fetch(BaseURL, {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             method: 'GET'
//         }).then((response) => response.json()).then((responseJSON) => {
//         }).catch((error) => {
//         });
//     }
// }

// // UPDATE  ACTION
// function wall(list) {
//     return {
//         type: "LOGIN-DONE",
//         list

//     }
// }
function getCities(state) {
    return (dispatch) => {
        return new Promise(function (resolve, reject) {
            fetch('/assets/cities.json', {method: 'GET'})
                .then(function (response) {
                    return response.json()
                })
                .then(function (myJson) {
                    resolve(myJson.filter((item) => {
                        return item.state == state;
                    }));
                });
        });
    }
}

// UPDATE  ACTION
function wall(list) {
    return {
        type: "GETCITIES_DONE",
        list

    }
}
