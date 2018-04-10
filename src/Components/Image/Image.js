import React, { Component } from 'react';
import base64Img from 'base64-img';
import loading from '../../Images/loading.gif';
import { Spin, Icon } from 'antd';
import './Image.css';


class ImageLoader extends Component {
    constructor(props) {
        super(props);
        console.log('image component', props)
        this.state = {
            imageSrc: (this.props.src) ? "http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + this.props.src + "&select=thumbnail" : loading,
            spin: true,
            className: (this.props.className) ? this.props.className : '',
            type: (this.props.type) ? this.props.type : ''
        }
    }

    componentDidMount() {
        let primaryImage = new Image();
        let imageSrc = (this.props.src) ? "http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + this.props.src : loading;

        primaryImage.onload = () => { // use arrow function here
            console.log(`image is loaded!`)
            console.log('jhgf')
            this.setState({ imageSrc: imageSrc })
        }

        primaryImage.src = imageSrc // do it after you set onload handler
    }
    // componentWillMount(){
    //     const primaryImage = new Image() // create an image object programmatically
    //     console.log(primaryImage)
    //     // primaryImage.onload = () => { // use arrow function here
    //     //     //   console.log(`image #${index + 1} is loaded!`)
    //     //     // copy images array from state
    //     //     console.log('jhgf')
    //     //     this.setState({ imageUrl: this.props.src})
    //     // }
    //     // primaryImage.src = this.state.imageUrl // do it after you set onload handler
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.src != nextProps.src) {
    //         this.setState({
    //             imageUrl: this.props.src
    //         });
    //         let _base = this;
    //         getImage(nextProps.src)
    //             .then(function (success) {
    //                 _base.setState({ imageUrl: success });
    //             }, function (error) {
    //                 console.log(error);
    //             });
    //     } else {
    //         console.log("same image");
    //     }
    // }

    render() {
        return (
            <img src={this.state.imageSrc} className={this.state.className} />
        );
    }
}

export default ImageLoader;