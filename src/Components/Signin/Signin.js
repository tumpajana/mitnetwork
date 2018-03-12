import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Input, Icon, Radio, Button } from 'antd';
import './Signin.css';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';
import mitlogo from '../../Images/mitlogo.png';

import loginData from '../../Services/signipapi'
import FacebookloginData from '../../Services/socialapi'
const RadioGroup = Radio.Group;

class Signin extends Component {
  state = {
    value: 1,
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToReferrer: false,
      valid:{
        nameText:'',
        nameTextt:'',
        
      },
      facebookInfo: {
        name: '',
        providerName: '',
        providerPic: '',
        providerId: '',
        email: '',
        phoneNumber: '',
        token: ''
      }

    };

    this.login = this.login.bind(this);
    this.onChangeLoginName = this.onChangeLoginName.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);

  }

  responseFacebook = (response) => {
    console.log(response);
    this.facebookInfo = response;
    console.log(this.facebookInfo)
    this.state.facebookInfo = {
      name: response.name,
      providerName: 'Facebook',
      providerPic: response.picture.data.url,
      providerId: response.userID,
      email: response.email,
      phoneNumber: '999999999',
      token: response.accessToken
    }
    this.facebookLogin(response, 'facebook')
  }

  responseGoogle = (response) => {
    console.log(response, 'google');
    this.facebookInfo = response;
    console.log(this.facebookInfo)
    this.state.facebookInfo = {
      name: response.w3.ig,
      providerName: 'Google',
      providerPic: response.w3.Paa,
      providerId: response.El,
      email: response.profileObj.email,
      token: response.tokenObj.access_token
    }
    this.facebookLogin(response, 'google')
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


  onChangeLoginName(e) {
    if(e.target.value.length == 0){
      if(e.target.name == 'email'){
        this.setState({
          valid:{
            nameText:'email can not be empty'
          }
        });
      }
//       if(e.target.value.length!== 0 && !(e.target.email.match (/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i))){
//          this.setState({
//           valid:{
//             nameText:'email is invalid'
//       }
    
//   });
//  }


     }else{
      if(e.target.name == 'email'){
        this.setState({
          valid:{
            nameText:''
          }
        });
      }
     }
    
    //validation for password
    if(e.target.value.length == 0){
      if(e.target.name == 'password'){
        this.setState({
          valid:{
            nameTextt:'password can not be empty'
          }
        });
      }
     }else{
      if(e.target.name == 'password'){
        this.setState({
          valid:{
            nameTextt:''
          }
        });
      }
     }
    this.setState({ [e.target.name]: e.target.value });
    console.log('onchangeusername', e.target.value, '+', e.target.name)

  }

  login = () => {
    if (this.state.email && this.state.password) {
      loginData(this.state).then((result) => {
        let response = result;
        console.log(response)
        if (response.user) {
          sessionStorage.setItem('userId',response.user._id);
          this.setState({ redirectToReferrer: true });
        }

      });
    }
    else{
      alert("Fields are required");
    }
  }

  facebookLogin =(res,type) => { 
    FacebookloginData(this.state.facebookInfo).then((result) => {
        let response = result;
        console.log(response)
        if (response.userData) {
          sessionStorage.setItem('loginData', JSON.stringify(response));
          this.setState({ redirectToReferrer: true });
        }

      });
    }
  
  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to ="/Profile"/>
    }
    const { userName } = this.state;

    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <div className="signuparea">
        <div className="signupcard">
          <Row type="flex" justify="center" >
            <Col lg={9} sm={0} xs={0}>

              <div className="sidesection">
                <img src={mitlogo} />
                <h2>Welcome To MIT Social</h2>
                <hr />
              </div>

            </Col>
            <Col lg={15} sm={24} xs={24} className="centercontent">
              <div className="formsigninmit">
                <div className="formarea">
                  <div className="formheading">
                    <p className="signfont">Sign In </p>
                  </div>
                </div>
                <Row type="flex" justify="center">

                  <Col lg={10} sm={10} xs={24} className="signinarea">
                    <form className="formsinput">

                      <Input
                        placeholder="Username"
                        name="email"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeLoginName}
                      />
                      
                      <div> {this.state.valid.nameText} </div>

                      <Input
                        placeholder=" Password"
                        name="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeLoginName}
                      />
                      
                      <div> {this.state.valid.nameTextt} </div>



                    </form>
                  </Col>
                  <Col lg={2} sm={2} xs={0}>

                    <div className="wrapper">
                      <div className="line"></div>
                      <div className="wordwrapper">
                        <div className="ordivider">OR</div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={12} sm={12} xs={24} className="sociallogin">

                    <div className="signupwithsocial">
                      <p className="ordividerres">OR</p>
                      {/* <Button className="facebooksignin">Sign in
                        <Icon type="facebook" />
                      </Button> */}
                      <FacebookLogin
                        appId="312775355854012"
                        autoLoad={true}
                        fields="name,email,picture"
                        // onClick={componentClicked}
                        callback={this.responseFacebook}
                        className="facebooksignin"
                        icon="fa-facebook" />
                      {/* <Button className="googleplussign">Sign in
                        <Icon type="google-plus" />
                      </Button> */}
                      <GoogleLogin
                        clientId="1039315261739-cesl5gtd6vqk00bancklm039rcjo3orq.apps.googleusercontent.com"
                        buttonText="Login"
                        className="googleplussign"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        icon="google-plus"
                        
                      />
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
