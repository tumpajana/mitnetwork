import React, { Component } from 'react';
import { Input, Icon, Radio, Button } from 'antd';
import './Signin.css';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import mitlogo from '../../Images/mitlogo.png';
import loginData from '../../Services/signipapi'
const RadioGroup = Radio.Group;

class Signin extends Component {
  state = {
    value: 1,
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      Password:'',
      redirectToReferrer:false
    };

    this.login = this.login.bind(this);
    this.onChangeLoginName = this.onChangeLoginName.bind(this);
  }
  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  }
  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  }
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }


  onChangeLoginName(e){
  this.setState({[e.target.name]:e.target.value});
  console.log('onchangeusername', e.target.value,'+', e.target.name)

 }

  login = () => {
    // console.log('submit button');
    if (this.state.email && this.state.Password) {
     loginData(this.state).then((result) => {
        let response = result;
        if (response.userData) {
          sessionStorage.setItem('loginData', JSON.stringify(response));
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
                    <p className="signfont">Sign In </p>
                  </div>
                </div>
                <Row type="flex" justify="center">

                  <Col span={10} className="signinarea">
                    <form className="formsinput">
                     
                      <Input
                        placeholder="Username"
                        name="email"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeLoginName}
                      />
                      
                      <Input
                        placeholder=" Password"
                        name="Password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeLoginName}
                      />
                    


                    </form>
                  </Col>
                  <Col span={2}>

                    <div className="wrapper">
                      <div className="line"></div>
                      <div className="wordwrapper">
                        <div className="ordivider">OR</div>
                      </div>
                    </div>
                  </Col>
                  <Col span={12} className="sociallogin">
                  
                      <div className="signupwithsocial">
                        <Button className="facebooklogin">Sign in with Facebook
                        <Icon type="facebook" />
                        </Button>
                        <Button className="googlepluslogin">Sign in with Google Plus
                        <Icon type="google-plus" />
                        </Button>
                       
                      </div>
                  
                  </Col>

                  <div className="registerbtn">
                    <Button className="sbmtbtn" onClick={this.login}>Submit</Button>
                    <Button className="cnclbtn">Cancel</Button>
                    <p className="regtext"> New User ? &nbsp;&nbsp;<a className="loginlink" href='/Signup'>Register</a> &nbsp;here</p>
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

export default Signin
