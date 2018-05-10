import { APIURL } from '../urlconfig';
import { push } from 'react-router-redux';
import { Button, notification } from 'antd';


const openNotification = (type, content) => {
    notification.open({
        message: type,
        description: content,
    });
};

export function Login(data,path) {
    console.log(data)
    console.log(APIURL)
    let BaseURL = APIURL + 'user/login';

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
                path.push('/layout/profile');
                openNotification('success', 'Login successfully done');
            }
            else{
                openNotification('warning', 'Login failed');
            }

        })
        .catch((error) => {
            openNotification('warning', 'Login failed');
        });
}

export function Register(data) {
    console.log(data)
    console.log(APIURL)
    let BaseURL = APIURL + 'user/registration';
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