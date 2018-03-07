import React, { Component } from 'react';
import { Input, Icon, Radio, Button } from 'antd';
import './Signup.css';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import mitlogo from '../../Images/mitlogo.png';
import { Redirect } from 'react-router-dom';
import PostData from '../../Services/signupapi'
const RadioGroup = Radio.Group;

class Signup extends Component {
  // state = {
  //   userName: '',
  //   firstName:'',
  //   lastName:'',
  //   phoneNumber:''
  // }
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      name: '',
      password: '',
      phoneNumber: ''

    };

    this.register = this.register.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }
  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  }
  onChangeUserName = (e) => {
    // this.setState({[e.target.name]:e.target.value});
    this.setState({ userName: e.target.value });

  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }


  //onchange of input feild binding
  onChangeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log('onchangeusername', e.target.value)
  }
  //submit registration form
  register() {

    console.log('submit button');
    if (this.state.userName && this.state.password && this.state.email && this.state.name && this.state.phoneNumber) {
      PostData('signup', this.state).then((result) => {
        let response = result;
        if (response.userData) {
          sessionStorage.setItem('userData', JSON.stringify(response));
          this.setState({ redirectToReferrer: true });
        }

      });
    }
  }
  render() {

    const { userName } = this.state;

    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div className="signuparea">
        <div className="signupcard">
          <Row type="flex" justify="center">
            <Col span={9}>

              <div className="sidesection">
                <img src={mitlogo} />
                <h2>Welcome To MIT Social</h2>
                <hr />
              </div>

            </Col>
            <Col span={15}>
              <div className="formsigninmit">
                <div className="formarea">
                  <div className="formheading">
                    <p className="signfont">Sign Up </p>
                  </div>
                </div>
                <Row type="flex" justify="center">

                  <Col span={10}>
                    <form className="formsinput">
                      <Input
                        placeholder="Your Name"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={suffix}

                        onChange={this.onChangeValue}
                        ref={node => this.userNameInput = node}
                      />
                      <Input
                        placeholder="Username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeValue}
                      />
                      {/* <Input
                      placeholder="Username"
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    
                    /> */}
                      {/* <p class="genderchoose"> Gender</p>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                      <Radio value={1} className="gendervalue">Male</Radio>
                      <Radio value={2} className="gendervalue">Female</Radio>

                    </RadioGroup> */}
                      <Input
                        placeholder=" Email"
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeValue}
                      />
                      <Input
                        placeholder=" Phone Number"
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeValue}
                      />
                      <Input
                        placeholder=" Password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeValue}
                      />
                      <Input
                        placeholder="Confirm Password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeValue}
                      />


                    </form>
                  </Col>
                  <Col span={4}>

                    <div className="wrapper">
                      <div className="line"></div>
                      <div className="wordwrapper">
                        <div className="ordivider">OR</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={10}>

                    <div ></div>
                  </Col>

                  <div className="registerbtn">
                    <Button className="sbmtbtn" onClick={this.register}>Submit</Button>
                    <Button className="cnclbtn">Cancel</Button>
                  </div>

                </Row>
              </div>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}

export default Signup;
