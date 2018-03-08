import React, { Component } from 'react';
import { Icon, Row, Col, Button } from 'antd';
import './Profile.css';

import User from '../../Images/user10.jpg';
import Userback from '../../Images/male.png';
import backprofile from '../../Images/backpro.svg';
// import backprofile from '../../Images/backpro.jpg';

class Profile extends Component {
  render() {
    return (
      <div className="App">
        <section className="profilesec">
          <img src={backprofile} />
          <div className="procard">
            <div className="userdetail">
              <div className="userpic">
                <img src={User} />
              </div>
              <Icon type="edit" />
              <p>Jess Williams </p>
              <h4>Jessica24 </h4>
              {/* <h3>Senior manager at denali bank</h3> */}
            </div>
            <div className="prodetail maildetail">
              <Row type="flex" justify="space-around" align="middle">
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>
                      <Icon type="mail" />
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>JessicaWilliams@gmail.com</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>

                      <Icon type="mobile" />
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>9865366456</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="prodetail addetail">
              <Row type="flex" justify="space-around" align="middle">
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>
                      <Icon type="home" />
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>B23, lime hill, hawai road</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>
                      <Icon type="environment-o" />
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>U.S.A</p>
                    </Col>
                  </Row>

                </Col>
              </Row>
            </div>
            <div className="prodetail prodetail2">
              <Row type="flex" justify="space-around" align="middle">
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>
                      <Icon type="book" />
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>M.Tech in CSE</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>
                      <Icon type="profile" />
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>Software Engineer</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Profile;
