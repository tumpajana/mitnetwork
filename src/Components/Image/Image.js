import React, { Component } from 'react';
import base64Img from 'base64-img';
import loading from '../../Images/loading.gif';
import { Spin, Icon } from 'antd';
import './Image.css';


class ImageLoader extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.src);
        this.state = {
            imageSrc:  (this.props.type == 'avatar')?"http://ec2-52-27-118-19.us-west-2.compute.amazonaws.com:5000/file/getImage?imageId=" + this.props.src : "http://ec2-52-27-118-19.us-west-2.compute.amazonaws.com:5000/file/getImage?imageId=" + this.props.src + "&select=thumbnail",
            // imageSrc:  (this.props.type == 'avatar')?"http://ec2-52-27-118-19.us-west-2.compute.amazonaws.com:5000/file/getImage?imageId=" + this.props.src:"",
            spin: true,
            className: (this.props.className) ? this.props.className : '',
            // type: (this.props.type=='avatar') 
        }
        console.log(this.state.imageSrc)
    }

    // componentDidMount() {
    //     let primaryImage = new Image();
    //     let imageSrc = "http://ec2-52-27-118-19.us-west-2.compute.amazonaws.com:5000/file/getImage?imageId=" + this.props.src;

    //     primaryImage.onload = () => { // use arrow function here
    //         this.setState({ imageSrc: imageSrc })
    //     }

    //     primaryImage.src = imageSrc // do it after you set onload handler
    // }

    componentWillReceiveProps() {
        console.log(this.props);
         let primaryImage = new Image();
        let imageSrc = "http://ec2-52-27-118-19.us-west-2.compute.amazonaws.com:5000/file/getImage?imageId=" + this.props.src;
        primaryImage.onload = () => { // use arrow function here
            this.setState({ imageSrc: imageSrc })
        }

        primaryImage.src = imageSrc // do it after you set onload handler
    }
    


    render() {
        return (
         
            <img src={this.state.imageSrc} className={this.state.className} />
        );
    }
}

export default ImageLoader;