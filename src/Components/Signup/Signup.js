import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Form, Input, Icon, Radio, Button } from 'antd';
import './Signup.css';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import mitlogo from '../../Images/mitlogo.png';
import { Redirect, NavLink } from 'react-router-dom';
import PostData from '../../Services/signupapi';
import FacebookloginData from '../../Services/socialapi';
import { browserHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

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



    this.register = this.register.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Login with Facebook
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

  //login with Google
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
    console.log(e.target.name);

    //  if(e.target.value.length != 0){
    //  if( e.target.name == 'email' && (e.target.email !=(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/))){
    //   this.setState({
    //     valid:{
    //       nameText:' enter a valid email '
    //     }
    //   })
    // }}


    this.setState({ [e.target.name]: e.target.value });
    console.log('onchangeusername', e.target.value, '+', e.target.name)

  }
  //validation

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.register();
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
      callback('Two passwords that you enter is inconsistent!');
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
  register = () => {
    console.log('submit button');
    console.log(this.state.name)
    // if(this.handleValidation()){     // validation function

    if (this.state.userName && this.state.password && this.state.email && this.state.name && this.state.phoneNumber) {
      PostData(this.state).then((result) => {
        let response = result;
        console.log(result)
        if (response.error == false) {
          toast.success("You have been registered successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
          if (response.user) {
            sessionStorage.setItem('userId', response.user._id);
            this.setState({ redirectToReferrer: true });
          }
        }
        else if (response.error == true) {
          toast.warn("Phonenumber/Email already exist !", {
            position: toast.POSITION.TOP_CENTER,
          });
        }

      });
    }
    //else{
    // alert("Form has errors.")
    // }

  }

  facebookLogin = (res, type) => {
    FacebookloginData(this.state.facebookInfo).then((result) => {
      let response = result;
      console.log("registration", result);
      if (result.error == false) {
        toast.success("You have been registered successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(response);
        if (response.userData) {
          sessionStorage.setItem('userId', response.result._id);
          this.setState({ redirectToReferrer: true });
        }
        else {
          toast.warn("Number already exist!", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }

    });
  }
  //else{
  // alert("Form has errors.")
  // }


  // facebookLogin = (res, type) => {
  //   FacebookloginData(this.state.facebookInfo).then((result) => {
  //     let response = result;
  //     console.log(response)
  //     if (response.userData) {
  //       sessionStorage.setItem('loginData', JSON.stringify(response));
  //       this.setState({ redirectToReferrer: true });
  //     }

  //   });
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.redirectToReferrer) {
      return <Redirect to="/wall" />
    }
    const { userName } = this.state;

    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div className="signuparea">
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

                <Row type="flex">

                  <Col lg={10} sm={10} xs={24}>
                    <form onSubmit={this.handleSubmit} className="formsinput">
                      <FormItem>
                        {getFieldDecorator('name', {
                          rules: [{ required: true, message: 'name is required' }],
                        })(
                          <Input

                            placeholder="Your Name"
                            name="name"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={suffix}
                            // value={userName}
                            // onChange={this.onChangeUserName}
                            // onChange={this.handleChange.bind(this, "name")} 
                            //value={this.state.fields["name"]}
                            onChange={this.onChangeValue}
                          // ref={node => this.userNameInput = node}

                          />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('Username', {
                          rules: [{ required: true, message: 'Username is required' }],
                        })(
                          <Input
                            placeholder="Username"
                            name="userName"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}

                            onChange={this.onChangeValue}

                          />
                        )}
                      </FormItem>

                      {/* <Input
                      placeholder="Username"
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    
                    /> */}
                      {/* <p class="genderchoose"> Gender</p>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                      <Radio value={1} className="gendervalue">Male</Radio>
                      <Radio value={2} className="gendervalue">Female</Radio>
                    </RadioGroup> */}
                      <FormItem>
                        {getFieldDecorator('email', {
                          rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                          }, { required: true, message: 'email is required' }],
                        })(
                          <Input
                            placeholder=" Email"
                            name="email"
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            //<input ref="name" type="text" size="30" placeholder="Name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                            onChange={this.onChangeValue}

                          />
                        )}
                      </FormItem>
                      <FormItem>
                        {getFieldDecorator('phoneNumber', {
                          rules: [{ required: true, message: 'phoneNumber is required' }],
                        })(
                          <Input
                            placeholder=" Phone Number"
                            name="phoneNumber"

                            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}

                            onChange={this.onChangeValue}
                          // value={this.state.fields["phoneNumber"]}
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
                            // type="password"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}

                            onChange={this.onChangeValue}

                          />
                        )}
                      </FormItem>
                      <FormItem >

                        {getFieldDecorator('confirmPassword', {
                          rules: [{
                            required: true, message: 'confirmPassword is required',
                          }, {
                            validator: this.compareToFirstPassword,
                          }],
                        })(
                          <Input type="password" onBlur={this.handleConfirmBlur}
                            placeholder="Confirm Password"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            name="confirmPassword"

                            onChange={this.onChangeValue}
                          />
                        )}
                      </FormItem>
                      {/* <Row>
                        <div className="registerbtn">
                          <Button className="sbmtbtn" type="primary" htmlType="submit">Submit</Button>
                          <Button className="cnclbtn">Cancel</Button>

                          <p className="regtext"> Already Registered ? &nbsp;&nbsp;<NavLink to="/login">Login</NavLink> &nbsp;here</p>
                        </div>
                      </Row> */}
                    </form>
                  </Col>
                  <Col lg={2} sm={2} xs={0}>

                    <div className="wrapperor">
                      <div className="line"></div>
                      <div className="wordwrapper">
                        <div className="ordivider">OR</div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={12} sm={12} xs={24} className="sociallogin">

                    <div className="signupwithsocial">
                      <p className="ordividerres">OR</p>
                      {/* <Button className="facebooklogin">Sign in 
                  <Icon type="facebook" />
                  </Button>
                  <Button className="googlepluslogin">Sign in 
                  <Icon type="google-plus" />
                  </Button> */}
                      <FacebookLogin
                        appId="312775355854012"
                        autoLoad={true}
                        fields="name,email,picture"
                        // onClick={componentClicked}
                        callback={this.responseFacebook}
                        className="facebooksignin"
                        icon="fa-facebook" />
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



                </Row>
                <Row>
                        <div className="registerbtn">
                          <Button className="sbmtbtn" type="primary" htmlType="submit">Submit</Button>
                          <Button className="cnclbtn">Cancel</Button>

                          <p className="regtext"> Already Registered ? &nbsp;&nbsp;<NavLink to="/login">Login</NavLink> &nbsp;here</p>
                        </div>
                      </Row>



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