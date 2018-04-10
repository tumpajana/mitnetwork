import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import './Photo.css';

export default class LightboxExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
            images: this.props.imageUrls,
            hasPrevious: false,
            hasNext: (this.props.imageUrls.length > 1) ? true : false
        };
    }

    calculateState = () => {
        let length = this.state.images.length;
        let index = this.state.photoIndex;0
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

        if (numImages === 1) {
            return (
                <div className="photoBlock">
                    <img onClick={() => this.showImage(0)} className="cell_1h" src={this.props.imageUrls[0]} />
                </div>
            );
        }
        if (numImages === 2) {
            return (
                <div className="photoBlock">
                    <img onClick={() => this.showImage(0)} className="cell_2h" src={this.props.imageUrls[0]} />
                    <img onClick={() => this.showImage(1)} className="cell_2h" src={this.props.imageUrls[1]} />
                </div>
            );
        }
        if (numImages === 3) {
            return (
                <div className="photoBlock">
                    <img onClick={() => this.showImage(0)} className="cell_3h" src={this.props.imageUrls[0]} />
                    <img onClick={() => this.showImage(1)} className="cell_3h" src={this.props.imageUrls[1]} />
                    <img onClick={() => this.showImage(2)} className="cell_3h" src={this.props.imageUrls[2]} />
                </div>
            );
        }
        if (numImages === 4) {
            return (
                <div className="photoBlock">
                    <img onClick={() => this.showImage(0)} className="cell_3h" src={this.props.imageUrls[0]} />
                    <img onClick={() => this.showImage(1)} className="cell_3h" src={this.props.imageUrls[1]} />
                    <img onClick={() => this.showImage(2)} className="cell_3h" src={this.props.imageUrls[2]} />
                    <img onClick={() => this.showImage(3)} className="cell_3h" src={this.props.imageUrls[3]} />
                </div>
            );

        }

        else {
            return (
                <div className="photoBlock">
                    <img onClick={() => this.showImage(0)} className="cell_3h" src={this.props.imageUrls[0]} />
                    <img onClick={() => this.showImage(1)} className="cell_3h" src={this.props.imageUrls[1]} />
                    <img onClick={() => this.showImage(2)} className="cell_3h" src={this.props.imageUrls[2]} />
                    <img onClick={() => this.showImage(3)} className="cell_4h"  src={this.props.imageUrls[3]} />
                    <span className="cell_5h">+{numImages - 3}</span>

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
                        mainSrc={this.props.imageUrls[this.state.photoIndex]}
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