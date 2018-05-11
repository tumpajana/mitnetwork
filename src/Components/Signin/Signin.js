import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Form, Input, Icon, Radio, Button, notification } from 'antd';
import './Signin.css';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Redirect, NavLink } from 'react-router-dom';
import mitlogo from '../../Images/mitlogo.png';
import loginData from '../../Services/signipapi'
import FacebookloginData from '../../Services/socialapi'
import { ToastContainer, toast } from 'react-toastify';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import * as actionCreater from '../../redux/action';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
       show: false,
      email: '',
      password: '',
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
      gDisabled: false
    };

    this.login = this.login.bind(this);
    this.onChangeLoginName = this.onChangeLoginName.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  responseGoogle = (response) => {
    console.log(response, 'google');
    if (response.hasOwnProperty('error')) {
      this.setState({
        gDisabled: false
      });
    } else {
      this.setState({
        gDisabled: true
      });
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
        this.login(values);
      }

    });
  }


  login = (values) => {
    console.log(values)
     this.setState({ show: true });
    this.setState({ iconLoading: true });
  console.log(values.email,values.password)
  let data={
    email:values.email,
    password:values.password
  }

      this.props.actions.Login(data,this.props.history);
      this.setState({ show: false });
      this.setState({ iconLoading: false });
  }

  facebookLogin = (res, type) => {
    this.setState({ show: false });
    this.props.actions.FacebookloginData(this.state.facebookInfo)
    // .then((result) => {
    //   this.setState({
    //     fbIcon: 'fa fa-facebook',
    //     fbDisabled: false,
    //     gDisabled: false
    //   });
    //   this.setState({ show: true });
    //   let response = result;
    //   console.log(response)
    //   if (response.error == false) {
    //     sessionStorage.setItem('userId', response.result._id);
    //     this.setState({ redirectToReferrer: true });
    //   }
    // });
  }

  // notification show
  openNotificationWithIcon = (type, content) => {
    let notificationContent = {
      message: type.ucfirst(),
      description: content,
      duration: 1,
    }
    notification[type](notificationContent);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // if (this.state.redirectToReferrer) {
      // return <Redirect to="/layout/wall" />
    // }
    const { userName } = this.state;

    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <div className="signuparea signinarea">
                <Loading
          show={this.state.show}
          color=" orange"
            showSpinner={false}

        />
        <div className="signupcard">
          <Row type="flex" justify="center" >
            <Col lg={9} sm={0} xs={0}>

              <div className="sidesection">
                <img src={mitlogo} />
                <h2>Welcome To MIT Social</h2>
                <hr />
              </div>

            </Col>
            <Col lg={15} sm={24} xs={24} className="">
              <div className="formsigninmit">
                <div className="formarea">
                  <div className="formheading">
                    <p className="signfont">Sign In </p>
                  </div>
                </div>
                <div className="signinflds">
                  <Row type="flex" >

                    <Col lg={10} sm={10} xs={24} className="signinarea">
                      <Form onSubmit={this.handleSubmit} className="formsinput">
                        <FormItem>
                          {getFieldDecorator('email', {
                            rules: [{
                              type: 'email', message: 'email is not valid',
                            }, { required: true, message: 'email is required' }],
                          })(
                            <Input
                              placeholder="Email"
                              type="email"
                              name="email"
                              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              // onChange={this.onChangeLoginName}
                              autoComplete="off"
                            />
                          )}
                        </FormItem>

                        <FormItem>
                          {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'password is required' }],
                          })(
                            <Input
                              placeholder=" Password"
                              type="password"
                              name="password"
                              minLength="6"
                              maxLength="10"
                              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                              // onChange={this.onChangeLoginName}
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

                        {/* <Button className="googleplussign">Sign in
                        <Icon type="google-plus" />
                      </Button> */}
                      </div>

                    </Col>
                    <Col lg={12} sm={12} xs={24} className="submitlogin">
                      <div className="registerbtn">
                        <Button className="sbmtbtn" type="primary" htmlType="submit" loading={this.state.iconLoading} onClick={this.handleSubmit}>Submit</Button>
                        {/* <Button className="cnclbtn">Cancel</Button> */}
                        <p className="regtext"> New User ? &nbsp;&nbsp; <NavLink to="/Signup">Register now</NavLink></p>
                      </div>
                    </Col>
                  </Row>
                </div>
                {/* <Row>
                  <div className="registerbtn">
                    <Button className="sbmtbtn" type="primary" htmlType="submit" onClick={this.login}>Submit</Button>
                    <Button className="cnclbtn">Cancel</Button>
                    <p className="regtext"> New User ? &nbsp;&nbsp; <NavLink to="/Signup">Register now</NavLink></p>
                  </div>
                </Row> */}
              </div>


            </Col>

          </Row>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state
}
function mapDispatchToProps(dispatch, state) {
  return ({
      actions: bindActionCreators(actionCreater, dispatch)
  })
}
const WrappedNewProject = Form.create()(Signin);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNewProject);


