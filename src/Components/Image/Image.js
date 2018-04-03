import React, { Component } from 'react';
import base64Img from 'base64-img';
import loading from '../../Images/loading.gif';
import { Spin, Icon } from 'antd';
import './Image.css';

//convert image to base 64
function getImage(src) {
    return new Promise(function (resolve, reject) {
        if (src) {
            if (src.includes("base64") && src.includes("image/") && src.includes("data:")) {
                resolve(src);
            } else {
                base64Img.requestBase64(src, function (err, res, body) {
                    if (!err) {
                        resolve(body);
                    } else {
                        reject(err);
                    }
                });
            }
        } else {
            reject(false);
        }
    });
}

// check if image is a base 64
function isBase64(str) {
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}


class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSrc: this.props.src,
            imageUrl: loading,
            spin: true,
            className: (this.props.className) ? this.props.className : '',
            type: (this.props.type) ? this.props.type : ''
        }

        let _base = this;
        getImage(this.state.imageSrc)
            .then(function (success) {
                _base.setState({ imageUrl: success });
            }, function (error) {
                console.log(error);
            });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.src != nextProps.src) {
            this.setState({
                imageUrl: loading
            });
            let _base = this;
            getImage(nextProps.src)
                .then(function (success) {
                    _base.setState({ imageUrl: success });
                }, function (error) {
                    console.log(error);
                });
        } else {
            console.log("same image");
        }
    }

    render() {
        return (
            <img src={this.state.imageUrl} type={this.state.type} className={this.state.className} />
        );
    }
}

export default Image;