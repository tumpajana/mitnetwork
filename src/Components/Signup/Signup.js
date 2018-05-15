import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Form, Input, Icon, Radio, Button, notification } from 'antd';
import './Signup.css';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import mitlogo from '../../Images/mitlogo.png';
import { Redirect, NavLink } from 'react-router-dom';
import PostData from '../../Services/signupapi';
import FacebookloginData from '../../Services/socialapi';
import { browserHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import * as actions from '../../reducers/action';
// import NumberFormat from 'react-number-format';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;


class Signup extends Component {


  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      redirectToReferrer: false,
      iconLoading: false,

      facebookInfo: {
        name: '',
        providerName: '',
        providerPic: '',
        providerId: '',
        email: '',
        phoneNumber: '',
        token: ''
      },
      fbIcon: 'fa fa-facebook',
      fbDisabled: false,
      gDisabled: false,
      show: false

    };



    this.register = this.register.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
  }

  //Login with Facebook
  responseFacebook = (response) => {
    this.setState({
      fbIcon: 'fa fa-circle-o-notch	fa-spin',
      fbDisabled: true
    });
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

  //login with Google
  responseGoogle = (response) => {
    console.log(response, 'google');
    if (response.hasOwnProperty('error')) {
      this.setState({
        gDisabled: false
      });
    } else {
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
      this.facebookLogin(response, 'google');
    }
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
    console.log('onchangeusername', e.target.value, '+', e.target.name)

  }
  //validation

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.register(values);
      }

    });
  }
  //password validation
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('password mismatch');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  
  
  //submit registration form
  register = (values) => {
    console.log(values);
     this.setState({ show: true });
    this.setState({ iconLoading: true });
    let data={
      userName: values.Username,
      email: values.email,
      name: values.name,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phoneNumber: values.phoneNumber,
    }
    console.log(data);
        actions.Register(data,this.props.history);
  }

  facebookLogin = (res, type) => {
    FacebookloginData(this.state.facebookInfo).then((result) => {
      let response = result;
      console.log("registration", result);
      this.setState({
        fbIcon: 'fa fa-facebook',
        fbDisabled: false,
        gDisabled: false
      });
      if (response.error == false) {
        if (response.result) {
          sessionStorage.setItem('userId', response.result._id);
          this.setState({ redirectToReferrer: true });
        }
      } else {
        this.openNotificationWithIcon('warning', response.message);
      }

    });
  }


  // notification show
  openNotificationWithIcon = (type, content) => {
    notification[type]({
      message: type.ucfirst(),
      description: content,
      duration: 1,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // if (this.state.redirectToReferrer) {
    //   return <Redirect to="/layout/profile" />
    // }
    const { userName } = this.state;

    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div className="signuparea">
             <Loading
          show={this.state.show}
          color=" orange"
            showSpinner={false}

        />
        <div className="signupcard">
          <Row type="flex" justify="center">
            <Col lg={9} sm={0} xs={0}>

              <div className="sidesection">
                <img src={mitlogo} />
                <h2>Welcome To MIT Social</h2>
                <hr />
              </div>

            </Col>
            <Col lg={15} sm={24} xs={24} className="">
              <div className="formsigninmit1">
                <div className="formarea">
                  <div className="formheading">
                    <p className="signfont">Sign Up </p>
                  </div>
                </div>
                <div className="inputflds">
                  <Row type="flex">

                    <Col lg={10} sm={10} xs={24}>
                      <Form onSubmit={this.handleSubmit} className="formsinput">
                        <FormItem>
                          {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'name is required' }],
                          })(
                            <Input
                              placeholder="Your Name"
                              name="name"
                              maxLength="30"
                              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              suffix={suffix}
                              // onChange={this.onChangeValue}
                            />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('Username', {
                            rules: [{ required: true, message: 'username is required' }],
                          })(
                            <Input
                              placeholder="Username"
                              name="userName"
                              maxLength="20"
                              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              // onChange={this.onChangeValue}
                            />
                          )}
                        </FormItem>

                        <FormItem>
                          {getFieldDecorator('email', {
                            rules: [{
                              type: 'email', message: 'email is not valid',
                            }, { required: true, message: 'email is required' }],
                          })(
                            <Input
                              placeholder=" Email"
                              name="email"
                              maxLength="30"
                              autoComplete="off"
                              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              // onChange={this.onChangeValue}
                            />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('phoneNumber', {
                            rules: [{ required: true, message: 'phonenumber is required' }],
                          })(

                            <Input
                              type="test"
                              placeholder=" Phone Number"
                              name="phoneNumber"
                              maxLength="10"
                              autoComplete="off"
                              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              // onChange={this.onChangeValue}
                            />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'password is required', },
                            {
                              validator: this.validateToNextPassword,
                            }],
                          })(
                            <Input type="password"
                              placeholder=" Password"
                              name="password"
                              minLength="6"
                              maxLength="10"
                              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              // onChange={this.onChangeValue}
                            />
                          )}
                        </FormItem>
                        <FormItem >

                          {getFieldDecorator('confirmPassword', {
                            rules: [{
                              required: true, message: 'confirm password is required',
                            }, {
                              validator: this.compareToFirstPassword,
                            }],
                          })(
                            <Input type="password" onBlur={this.handleConfirmBlur}
                              placeholder="Confirm Password"
                              minLength="6"
                              maxLength="10"
                              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              name="confirmPassword"
                              // onChange={this.onChangeValue}
                            />
                          )}
                        </FormItem>

                      </Form>
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

                        <FacebookLogin
                          appId="312775355854012"
                          autoLoad={false}
                          fields="name,email,picture"
                          callback={this.responseFacebook}
                          className="facebooksignin"
                          icon="fa-facebook"
                          textButton="Facebook"
                          icon={this.state.fbIcon}
                          isDisabled={this.state.fbDisabled}
                        />

                        <GoogleLogin
                          clientId="1039315261739-cesl5gtd6vqk00bancklm039rcjo3orq.apps.googleusercontent.com"
                          buttonText="Googleplus"
                          className="googleplussign"
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                          disabled={this.state.gDisabled}
                        />
                      </div>

                    </Col>
                    <Col lg={12} sm={12} xs={24} className="submitArea">
                      {/* <Row> */}
                      <div className="registerbtn">
                        <Button className="sbmtbtn" type="primary" onClick={this.handleSubmit} htmlType="submit" loading={this.state.iconLoading}>Submit</Button>
                        <p className="regtext"> Already Registered ? &nbsp;&nbsp;<NavLink to="/login">Login</NavLink> &nbsp;here</p>
                      </div>
                      {/* </Row> */}
                    </Col>



                  </Row>
                </div>

              </div>
            </Col>

          </Row>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
Form.create()(Signup);

export default Form.create()(Signup);