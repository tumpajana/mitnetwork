import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Form,Input, Icon, Radio, Button } from 'antd';
import './Signin.css';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom';
import mitlogo from '../../Images/mitlogo.png';
import loginData from '../../Services/signipapi'
import FacebookloginData from '../../Services/socialapi'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

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
    this.handleSubmit = this.handleSubmit.bind(this);

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
  
    this.setState({ [e.target.name]: e.target.value });
    console.log('onchangeusername', e.target.value, '+', e.target.name)

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.login();
      }

    });
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
    const { getFieldDecorator } = this.props.form;
    if (this.state.redirectToReferrer) {
      return <Redirect to ="/Profile"/>
    }
    const { userName } = this.state;

    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <div className="signuparea signinarea">
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
                    <form   onSubmit={this.handleSubmit} className="formsinput">
                    <FormItem>
                    {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Username is reruired' }],
          })(
                      <Input
                        placeholder="Username"
                        name="email"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeLoginName}
                      />
                    )}
                       </FormItem>
 
                      <FormItem>
                    {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Password is required' }],
          })(
                      <Input
                        placeholder=" Password"
                        name="password"
                        type="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={this.onChangeLoginName}
                      />
                    )}
                    </FormItem>
                

                  <div className="registerbtn">
                    <Button className="sbmtbtn" type="primary" htmlType="submit">Submit</Button>
                    <Button className="cnclbtn">Cancel</Button>
                    <p className="regtext"> New User ? &nbsp;&nbsp;<a className="loginlink" href='/Signup'>Register now</a></p>
                  </div>

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
                        autoLoad={false}
                        fields="name,email,picture"
                        // onClick={componentClicked}
                        callback={this.responseFacebook}
                        className="facebooksignin"
                        // icon="fa-facebook-square" 
                        />
                      
                      <GoogleLogin
                        clientId="1039315261739-cesl5gtd6vqk00bancklm039rcjo3orq.apps.googleusercontent.com"
                        buttonText="Login with Googleplus"
                        className="googleplussign"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        // icon="google-plus"
                        
                      />

                      {/* <Button className="googleplussign">Sign in
                        <Icon type="google-plus" />
                      </Button> */}
                    </div>

                  </Col>


                </Row>
              </div>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}

Form.create()(Signin);

export default Form.create()(Signin);

