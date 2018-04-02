import React, { Component } from 'react';
import { Upload, Row, Col, Input, Icon, Radio, Button, Modal, Select } from 'antd';
import './PostDetails.css';
import 'antd/dist/antd.css';
import Header from '../Header/Header.js';
import usrimgwall from '../../Images/usr.jpg';
import forward from '../../Images/forward.svg';
import clapbutton from '../../Images/clap.svg';
import messagebutton from '../../Images/message.svg';

import camera from '../../Images/camera.png';
import scenery from '../../Images/scenery.jpeg';
const { TextArea } = Input;
class PostDetails extends Component {
    render() {

        return (
            <div className="backgroundstem">
                {/* -- header navbar -- */}
                <Header ></Header>
                {/* -- header navbar -- */}
                {/* -- postdetails content -- */}
                <div className="postdetails">
                    <Row>
                        <Row >
                            <Col sm={12} md={12} lg={24}>
                                <img className="sceneryimage" src={scenery} />
                            </Col>
                        </Row>
                        <Row >
                            <Col sm={12} md={12} lg={24}>
                                <div className="doYour">
                                    <h1> Follow Your Dreams And Work Hard</h1>
                                    <p className="publish">Published on March 27 , 2018</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={12} lg={24}>
                                <div className="greatContent">
                                    <Row type="flex" >

                                        <Col xs={3} sm={3} md={2}>
                                            <div className="imageuser">
                                                <img src={usrimgwall} />
                                            </div>
                                        </Col>

                                        <Col xs={21} sm={21} md={14}>
                                            <div className="mariryan">
                                                <p className="nameEmployee">Mari Ryan, MBA, MHP, CWP</p>
                                                <p className="worksite">Worksite Well-being and Wellness Strategist</p>
                                                <p className="articles">19 articles</p>
                                            </div>
                                        </Col>

                                        <Col xs={21} sm={21} md={8}>
                                            <div className="iconpost">

                                                <Col xs={21} sm={21} md={8}>
                                                    <Button className="clapButton"><img src={clapbutton} /></Button><span className="number">214</span>
                                                </Col>
                                                <Col xs={21} sm={21} md={8}>
                                                <Button className="clapButton"><img src={messagebutton} /></Button><span className="number">214</span>
                                                </Col>
                                                <Col xs={21} sm={21} md={8}>
                                                <Button className="clapButton"><img src={forward} /></Button><span className="number">214</span>
                                                </Col>
                                            </div>
                                        </Col>

                                    </Row>
                                </div>

                            </Col>
                        </Row>
                        <Row >
                            <Col sm={12} md={12} lg={24}>
                                <div className="dummyContent">
                                    <p className="publish">Lorem Ipsum is simply dummy text of the printing and
                                 typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                 </p>
                                    <p className="publish">Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                 </p>
                                </div>
                                <div className="dummyContentreason">
                                    <h1 className="reasonLorem">Reason # 1 Latin words, consectetur, from a Lorem Ipsum passage, and going through</h1>
                                    <p className="publish">Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                 </p>
                                </div>
                                <div className="dummyContentreason">
                                    <h1 className="reasonLorem">Reason # 1 Latin words, consectetur, from a Lorem Ipsum passage, and going through</h1>
                                    <p className="publish">Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                 </p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={12} lg={24}>
                                <p className="this">Report this</p>
                                <div className="greatContentcomment">
                                    <Row type="flex" >
                                        <Col xs={3} sm={3} md={24}>
                                            <div className="imageuserprofile">
                                                <p className="totalnmber">415 Claps</p>
                                                <img src={usrimgwall} />
                                                <img src={usrimgwall} />
                                                <img src={usrimgwall} />
                                                <img src={usrimgwall} />
                                                <img src={usrimgwall} />
                                                <img src={usrimgwall} />
                                                <img src={usrimgwall} />
                                                <img src={usrimgwall} />
                                                <img src={usrimgwall} />
                                                <img src={usrimgwall} />
                                                <img src={usrimgwall} />
                                            </div>
                                        </Col>



                                    </Row>
                                </div>
                                <p className="totalComments">25 Comments</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={12} lg={24}>

                                <Row type="flex" >
                                    <Col xs={3} sm={3} md={24}>
                                        <div className="commentSectionpost">
                                            <p className="totalnmber">Show previous comments</p>

                                        </div>





                                        {/* ****Comment section**** */}
                                        <div className="commentcSection">



                                            <Row >
                                                <div className="contentspostComment">
                                                    <Col xs={3} sm={3} md={2}>
                                                        <div className="commentImg">
                                                            <img src={usrimgwall} />
                                                        </div>
                                                    </Col>

                                                    <Col xs={21} sm={21} md={22}>
                                                        <div className="postCommentborder">
                                                            <p className="postName">Guido Bücker</p>
                                                            <p className="postDesignation">Senior Business Consultant (SW Development) & Blockchain Evangelist</p>
                                                            <p className="postMessage">TECHCONNECT!</p>
                                
                                                        </div>
                                                    </Col>
                                                </div>
                                            </Row>
                                            <Row >
                                                <div className="contentspostComment">
                                                    <Col xs={3} sm={3} md={2}>
                                                        <div className="commentImg">
                                                            <img src={usrimgwall} />
                                                        </div>
                                                    </Col>

                                                    <Col xs={21} sm={21} md={22}>
                                                        <div className="postCommentborder">
                                                            <p className="postName">Guido Bücker</p>
                                                            <p className="postDesignation">Senior Business Consultant (SW Development) & Blockchain Evangelist</p>
                                                            <p className="postMessage">TECHCONNECT!</p>
                                
                                                        </div>
                                                    </Col>
                                                </div>
                                            </Row>
                                            <Row type="flex" justify="space-around" align="middle">

                                                <Col xs={3} sm={3} md={2}>
                                                    <div className="commentImg">
                                                        <img src={usrimgwall} />
                                                    </div>
                                                </Col>

                                                <Col xs={21} sm={21} md={22}>
                                                    <div className="commentText">
                                                        <img src={camera} />
                                                        <TextArea rows={1} placeholder="Add a comment...." />
                                                    </div>
                                                </Col>

                                            </Row>
                                        </div>










                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                    </Row>
                </div>

                {/* -- postdetails content -- */}
            </div>
        );
    }
}

export default PostDetails;
