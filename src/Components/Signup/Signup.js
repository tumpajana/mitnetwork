import React, { Component } from 'react';

import './Signup.css';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
class Signup extends Component {
  render() {
    return (
      <div className="signuparea">
      <div className="signupcard">
        <Row type="flex" justify="center">
          <Col span={8}>
            <div className="">

            </div>
          </Col>
          <Col span={15}>
            <div className="formarea">
              <div className="formheading">
                <p className="signfont">Sign Up </p>
              </div>
            </div>
          </Col>

        </Row>
        </div>
      </div>
    );
  }
}

export default Signup;
