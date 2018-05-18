import { APIURL } from '../urlconfig';
import { push } from 'react-router-redux';
import { Button, notification } from 'antd';
import { Socket } from 'dgram';


const openNotification = (type, content) => {
    notification.open({
        message: type,
        description: content,
    });
};

// login api
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
                console.log(responseJSON);
                sessionStorage.setItem('userId', responseJSON.user._id);
                openNotification('success', 'Login successfully done');
                path.push('/layout/profile');
            }
            else {
                openNotification('warning', 'Login failed');
            }
        })
        .catch((error) => {
            openNotification('warning', 'Login failed');
        });
    }
}

// registration api
export function Register(data,path) {
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
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            if (!responseJSON.error) {
                console.log(responseJSON);
                sessionStorage.setItem('userId', responseJSON.user._id);
                console.log(responseJSON.user._id)
                openNotification('success', 'Registration successfully done');
                path.push('/layout/wall');
            }
            else {
                openNotification('warning', 'Registration failed');
            }
        })
        .catch((error) => {
            openNotification('warning', 'Registration failed');
        });
    }
    }

// wallpost api
export function wallPost(postData) {
    console.log(postData)
    console.log(APIURL)
    let BaseURL = APIURL + 'post/socialPost';
    fetch(BaseURL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(postData)
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            if (!responseJSON.error) {
            }

        })
        .catch((error) => {
        });
}
// get Socket post data
export function singlePost(postData){
    console.log(postData)
    return (dispatch) => {
        dispatch(addPost(postData));
    }
}
// ADD NEW POST  ACTION
function addPost(socketPost) {
    return {
        type: "SINGLE_POST",
        socketPost
    }
}


// GET ALL WALL POST
export function WallGet(pagenumber) {
    console.log(pagenumber)
    console.log(APIURL)
    return (dispatch) => {
        fetch(APIURL + "post/getAllPost?page=" + pagenumber,
            {
                headers: {
                    'Accept': 'application/json',
            'Content-Type': 'application/json'
                },
                method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                dispatch(getAllPost(responseJSON.result))
            })
            .catch((error) => {
                dispatch(getAllPost([]))
            });

    }
}
// GET ALL POST  ACTION
function getAllPost(list) {
    return {
        type: "Wall_LIST",
        list
    }
}
// get Socket post data
export function singleComment(data){
    console.log(data)
    return (dispatch) => {
        dispatch(getSingleComment(data));
    }
}

//  Comment  ACTION
function getSingleComment(socketcomment) {
    return {
        type: "SINGLE_COMMENT",
        socketcomment
    }
}

// update user api
export function updateData(userData) {
    console.log(userData)
    console.log(APIURL)
    let BaseURL = APIURL + 'user/update';
    return (dispatch) => {
    fetch(BaseURL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(userData)
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            if (!responseJSON.error) {
                openNotification('success', 'User successfully done');
            }
        })
        .catch((error) => {
            openNotification('success', 'User not updated successfully');
        });
}
}


// facebook login api
export function FacebookloginData(FacebookData) {
    console.log(FacebookData)
    console.log(APIURL)
    let BaseURL = APIURL + 'user/socialRegistration';
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
            if (!responseJSON.error) {
            }

        })
        .catch((error) => {
        });
}

// profile pic api 
export function profilePic(filedata) {
    console.log(filedata)
    console.log(APIURL)
    let BaseURL = APIURL + 'file/upload';
    return (dispatch) => {
    fetch(BaseURL, {
        headers: {
            'Accept': 'application/json',
         // 'Content-Type': 'application/json'
        },
        method: 'POST',
        body: filedata
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            if (!responseJSON.error) {
                openNotification('success', 'Profile picture updated');
            }
            else{
                openNotification('warning', 'Profile picture not updated');
            }

        })
        .catch((error) => {
            openNotification('warning', 'Profile picture not updated');
        });
}
}


// get user profile api
export function getUserProfile(id) {
    console.log(APIURL)
    let BaseURL = APIURL + 'user/getSingle?userId=' + id;
    return (dispatch) => {
    fetch(BaseURL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            if (!responseJSON.error) {
            }

        })
        .catch((error) => {
        });
}
}

// post like api
export function postLike(filedata) {
    console.log(filedata)
    console.log(APIURL)
    let BaseURL = APIURL + 'post/like';
    fetch(BaseURL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(filedata)
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            if (!responseJSON.error) {
            }

        })
        .catch((error) => {
        });
}

// comment post api
export function commentPost(commentData) {
    console.log(commentData);
    let BaseURL = APIURL + 'post/comment';
    fetch(BaseURL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(commentData)
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            if (!responseJSON.error) {
            }

        })
        .catch((error) => {
        });
}


// post comment get api
export function getPostComments(postid) {
    console.log(postid);
    let BaseURL = APIURL + 'post/getCommentByPostId?postId=' + postid;
    fetch(BaseURL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            if (!responseJSON.error) {
            }

        })
        .catch((error) => {
        });
}

