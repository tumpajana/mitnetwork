import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import './Photo.css';
import {Row,Col} from 'antd';
export default class LightboxExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: false,
            images: this.props.imageUrls,
            hasPrevious: false,
            hasNext: (this.props.imageUrls.length > 1) ? true : false,
            imagePath:"http://ec2-52-27-118-19.us-west-2.compute.amazonaws.com:5000/file/getImage?imageId="
        };
    }

    calculateState = () => {
        let length = this.state.images.length;
        let index = this.state.photoIndex; 0
        console.log(length, index);
        if (index > 0 && index < length - 1) {
            this.setState((prevState) => {
                return { hasPrevious: true }
            });
            this.setState((prevState) => {
                return { hasNext: true }
            });
        } else if (index == 0) {
            this.setState((prevState) => {
                return { hasPrevious: false }
            });
            this.setState((prevState) => {
                return { hasNext: true }
            });
        } else {
            this.setState((prevState) => {
                return { hasPrevious: true }
            });
            this.setState((prevState) => {
                return { hasNext: false }
            });
        }
    }

    movePrevious = () => {

        if (this.state.photoIndex == 0) {
            this.setState({ isOpen: false });
            return;
        }

        this.setState({
            photoIndex: this.state.photoIndex - 1
        })

        this.calculateState()
    }

    moveNext = () => {

        if (this.state.photoIndex == this.props.imageUrls.length - 1) {
            this.setState({ isOpen: false });
            return;
        }

        this.setState({
            photoIndex: this.state.photoIndex + 1
        })

        this.calculateState()

    }
    showImage = (index) => {
        console.log(index);
        this.setState({
            photoIndex: index
        })
        this.calculateState()

        this.setState({ isOpen: true });


    }



    PhotoBlock() {
        var numImages = this.props.imageUrls.length;
        var divStyle = {
            color: 'white',
            backgroundImage: 'url("http://ec2-52-27-118-19.us-west-2.compute.amazonaws.com:5000/?imageId=5acc6ac482366c7c1ead2fe5")',
            WebkitTransition: 'all', // note the capital 'W' here
            msTransition: 'all' // 'ms' is the only lowercase vendor prefix
          };
          

        if (numImages === 1) {
            return (
                <div className="photoBlock">
                     <Row>
                    <Col md={24}>
                <div className="ImgGrid3">
                    <img onClick={() => this.showImage(0)} className="cell_1h" src={this.state.imagePath+this.props.imageUrls[0]._id} />
                    </div>
                    </Col>
                </Row>
                </div>
            );
        }
        if (numImages === 2) {
            return (
                <div className="photoBlock">
              <Row>
                    <Col md={6}>
                <div className="ImgGrid2">
                    <img onClick={() => this.showImage(0)} className="cell_2h" src={this.state.imagePath+this.props.imageUrls[0]._id} />
                    </div>
                    </Col>
                    <Col md={6}>
                    <div className="ImgGrid2">
                    <img onClick={() => this.showImage(1)} className="cell_2h" src={this.state.imagePath+this.props.imageUrls[1]._id} />
                    </div>
                    </Col>
                </Row>
                </div>
            );
        }
        if (numImages === 3) {
            return (
                <div className="photoBlock">
                 <Row>
                    <Col md={12}>
                <div className="ImgGrid">
                    <img onClick={() => this.showImage(0)} className="cell_3h" src={this.state.imagePath+this.props.imageUrls[0]._id} />
                    </div>
                    </Col>
                    <Col md={12}>
                    <div className="ImgGrid">
                    <img onClick={() => this.showImage(1)} className="cell_3h" src={this.state.imagePath+this.props.imageUrls[3]._id} />
                    </div>
                    </Col>
                    <Col md={12}>
                    <div className="ImgGrid">
                    <img onClick={() => this.showImage(2)} className="cell_3h" src={this.state.imagePath+this.props.imageUrls[2]._id} />
                    </div>
                    </Col>
                </Row>
                </div>
            );
        }
        if (numImages === 4) {
            return (
                <div className="photoBlock">
                <Row>
                    <Col md={6}>
                <div className="ImgGrid">
                    <img onClick={() => this.showImage(0)} className="cell_3h" src={this.state.imagePath+this.props.imageUrls[0]._id} />
                    </div>
                    </Col>
                    <Col md={6}>
                    <div className="ImgGrid">
                    <img onClick={() => this.showImage(1)} className="cell_3h" src={this.state.imagePath+this.props.imageUrls[3]._id} />
                    </div>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={6}>
                    <div className="ImgGrid">
                    <img onClick={() => this.showImage(2)} className="cell_3h" src={this.state.imagePath+this.props.imageUrls[2]._id} />
                    </div>
                    </Col>
                    <Col md={6}>
                    <div className="ImgGrid">
                    <img onClick={() => this.showImage(3)} className="cell_3h" src={this.state.imagePath+this.props.imageUrls[3]._id} />

                 
                </div>
                </Col>
                </Row>
                </div>
            );

        }

        else {
            return (
                <div className="photoBlock">
             <Row>
                 <Col md={6}>
                <div className="ImgGrid">
                    <img onClick={() => this.showImage(0)} className="cell_3h" src={this.state.imagePath+this.props.imageUrls[0]._id} />
                    </div>
                </Col>
                <Col md={6}>
                    <div className="ImgGrid">
                    <img onClick={() => this.showImage(1)} className="cell_3h" src={this.state.imagePath+this.props.imageUrls[2]._id} />
                    </div>
                 </Col>
                 </Row>
                 <Row>
                 <Col md={6}>
                    <div className="ImgGrid">
                    <img onClick={() => this.showImage(2)} className="cell_3h" src={this.state.imagePath+this.props.imageUrls[0]._id} />
                    </div>
                   </Col>
                   <Col md={6}>
                    <div className="ImgGrid1">
                    <img onClick={() => this.showImage(3)} className="cell_4h" src={this.state.imagePath+this.props.imageUrls[2]._id} />
                    <span className="cell_5h">+{numImages - 3}</span>
                 
                </div>
             </Col>
             </Row>
                </div>

            );
        }

    }

    render() {
        return (
            <div>
                <div type="button" onClick={() => this.setState({ isOpen: true })}>
                    {this.PhotoBlock()}
                </div>

                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.props.imageUrls[this.state.photoIndex]._id}
                        nextSrc={this.state.hasNext.toString()}
                        prevSrc={this.state.hasPrevious.toString()}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.movePrevious()
                        }
                        onMoveNextRequest={() =>
                            this.moveNext()
                        }
                    />
                )}
            </div>
        );
    }

}