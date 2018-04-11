import React, { Component } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import ReactFileReader from 'react-file-reader';
import { Upload, Row, Col, Form, Input, Icon, Radio, Button, Modal, Select, notification } from 'antd';

class Crop extends Component {

    state = {
        cropImage: '',
        preview: '',
        image: ''
    };
    profilePicUpload = (e) => {
        console.log(e);
        this.setState({ cropImage: e.base64 });
        console.log(this.state.cropImage)
    }

    _crop() {

        var imageUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
        console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
        // var contentType = 'image/png';
        // var blob = b64toBlob(imageUrl, contentType);
        // var blobUrl = URL.createObjectURL(blob);


        // console.log("blob",blob);
        // console.log("blobURL",blobUrl);

        // window.location = blobUrl;
        this.setState({ preview: this.refs.cropper.getCroppedCanvas().toDataURL() })
        // var image = new Image();
        // image.src = this.state.preview;
        // document.body.appendChild(image);
        // console.log(document.body.appendChild(image));
        // console.log(image);
        // let file = image.src;
        // var form = new FormData();
        // form.append('file', file, file.name);
        // console.log(file, file.name);
    }

    render() {
        return (
            <div>
                <div>
                    <ReactFileReader base64={true} handleFiles={this.profilePicUpload}>
                        <Button >
                            <Icon type="edit" />
                        </Button>
                    </ReactFileReader>
                </div>
                <div>
                    <Cropper
                        ref='cropper'
                        src={this.state.cropImage}
                        style={{ height: 400, width: '100%' }}
                        // Cropper.js options
                        aspectRatio={16 / 9}
                        guides={false}
                        crop={this._crop.bind(this)} />
                </div>
                <img
                    src={this.state.preview}
                />
            </div>
        );
    }
}
export default Crop;