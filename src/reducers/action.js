import { APIURL } from '../urlconfig';
import { push } from 'react-router-redux';
import { Button, notification } from 'antd';


const openNotification = (type, content) => {
    notification.open({
        message: type,
        description: content,
    });
};

export function Login(data, location) {
    // console.log(data)
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
                console.log(responseJSON)
                if (!responseJSON.error) {
                    location.push('/layout/profile');
                    // path.push('/layout/profile');
                    openNotification('success', 'Login successfully done');
                }
                else {
                    openNotification('warning', 'Login failed');
                }

            })
            .catch((error) => {
                openNotification('error', 'Login failed');
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
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            if (!responseJSON.error) {
                // this.props.history.push({
                //     pathname: '/layout/profile',
                // });
                openNotification('success', 'Registration successfully done');
            }

        })
        .catch((error) => {
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
    })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON)
            if (!responseJSON.error) {
                location.push('/crop');
                // path.push('/layout/profile');
                // openNotification('success', 'Profile updated successfully');
            }
            else {
                // openNotification('warning', 'Profile not updated successfully');
            }

        })
        .catch((error) => {
            // openNotification('warning', 'Login failed');
        });
    }
}

export function WallPost(postData) {
    console.log(postData);
    console.log(APIURL);
    let BaseURL = APIURL + 'post/socialPost';
    return (dispatch) => {
    // return new Promise((resolve, reject) => {
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
        //   resolve(responseJSON);
        })
        .catch((error) => {
        //   reject(error);
        });
    // });
}
  }

   export function WallGet(pagenumber) {
    let BaseURL = APIURL+"post/getAllPost?page=" + pagenumber;
    return (dispatch) => {
    // return new Promise((resolve, reject) => {
      fetch(BaseURL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseJSON) => {
        //   resolve(responseJSON);
        })
        .catch((error) => {
        //   reject(error);
        });
    // });
}
  }

  export function FacebookloginData(FacebookData) {
    let BaseURL = APIURL+'user/socialRegistration';
    return (dispatch) => {
    // return new Promise((resolve, reject) => {
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
                // resolve(responseJSON);
            })
            .catch((error) => {
                // reject(error);
            });
    // });
        }
}

export function profilePic(filedata) {
    console.log("file api", filedata);
    let BaseURL = APIURL+'file/upload';
    return (dispatch) => {
    // return new Promise((resolve, reject) => {
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
                // resolve(responseJSON);
                console.log("upload");
            })
            .catch((error) => {
                // reject(error);
                console.log("error");
            });
    // });
}
}

export function getUserProfile( id) {
    let BaseURL =APIURL+'user/getSingle?userId='+id;
    return (dispatch) => {
    // return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
         headers: {
         'Accept': 'application/json',         
           'Content-Type': 'application/json'},
   method: 'GET'
   })
   .then((response) => response.json())
   .then((responseJSON) => {
    // resolve(responseJSON);
   })
   .catch((error) => {
    // reject(error);
   });
//    });
}
   }

 export  function postLike( filedata) {
    let BaseURL =APIURL+'post/like';
    return (dispatch) => {
    // return new Promise((resolve, reject) =>{
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
    // resolve(responseJSON);
   })
   .catch((error) => {
    // reject(error);
   });
//    });
}
   }

 export function commentPost( commentData) {
    console.log(commentData);
    let BaseURL =APIURL+'post/comment';
    return (dispatch) => {
    // return new Promise((resolve, reject) =>{
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
    // resolve(responseJSON);
   })
   .catch((error) => {
    // reject(error);
   });
//    });
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

export function getStates() {
    return (dispatch) => {
    // return new Promise(function (resolve, reject) {
        fetch('/assets/states.json', { method: 'GET' })
            .then(function (response) {
                return response.json()
            }, function (error) {
                return error.json()
            })
            .then(function (myJson) {
                // resolve(myJson);
            }, function (error) {
                // reject(error);
            });
    // });
        }
}

export function getPostComments( postid) {
    //let BaseURL = '   let BaseURL = 'https://api.thewallscript.com/restful/';';
    console.log(postid);
    let BaseURL =APIURL+'post/getCommentByPostId?postId='+postid;
    return (dispatch) => {
    // return new Promise((resolve, reject) =>{
    fetch(BaseURL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
   method: 'GET',
   })
   .then((response) => response.json())
   .then((responseJSON) => {
    // resolve(responseJSON);
   })
   .catch((error) => {
    // reject(error);
   });
//    });
    }
   }

   function getCities(state) {
    return (dispatch) => {
    return new Promise(function (resolve, reject) {
        fetch('/assets/cities.json', { method: 'GET' })
            .then(function (response) { return response.json() })
            .then(function (myJson) {
                resolve(myJson.filter((item) => {
                    return item.state == state;
                }));
            });
    });
}
}