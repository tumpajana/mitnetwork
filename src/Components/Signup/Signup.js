import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Input, Icon, Radio, Button } from 'antd';
import './Signup.css';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import mitlogo from '../../Images/mitlogo.png';
import { Redirect } from 'react-router-dom';
import PostData from '../../Services/signupapi';
import FacebookloginData from '../../Services/socialapi';
import { browserHistory } from 'react-router';
const RadioGroup = Radio.Group;

class Signup extends Component {

 
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      name: '',
      password: '',
      confirmPassword:'',
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
    console.log(e)
    this.setState({ [e.target.name]: e.target.value });
    console.log('onchangeusername', e.target.value, '+', e.target.name)
  }

 //validation
 handleValidation()  {
  //  debugger;
  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  //Name
  if(!fields["name"]){
     formIsValid = false;
     errors["name"] = "Cannot be empty";
  }

  if(typeof fields["name"] !== "undefined"){
       if(!fields["name"].match(/^[a-zA-Z]+$/)){
           formIsValid = false;
           errors["name"] = "Only letters";
       }          
  }
//UserName

  if(!fields["userName"]){
    formIsValid = false;
    errors["userName"] = "Cannot be empty";
 }

 if(typeof fields["userName"] !== "undefined"){
      if(!fields["userName"].match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["userName"] = "Only letters";
      }          
 }

  //Email
  if(!fields["email"]){
     formIsValid = false;
     errors["email"] = "Cannot be empty";
  }

  if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
 }
//password
if(!fields["password"]){
  formIsValid = false;
  errors["password"] = "Cannot be empty";
}

if(typeof fields["password"] !== "undefined"){
    if(!fields["password"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["password"] = "Only letters";
    }          
}
//phonenumber

if(!fields["phoneNumber"]){
  formIsValid = false;
  errors["phoneNumber"] = "Cannot be empty";
}


 this.setState({errors: errors});
 return formIsValid;
}
//new change
contactSubmit(e){
  e.preventDefault();
  if(this.handleValidation()){
     alert("Form submitted");
  }else{
     alert("Form has errors.")
  }

}

handleChange(field, e){         
  let fields = this.state.fields;
  fields[field] = e.target.value;        
  this.setState({fields});
}


  //submit registration form
  register = () => {
    console.log('submit button');
    console.log(this.state.name)
    // if(this.handleValidation()){     // validation function
      
   if (this.state.userName && this.state.password && this.state.email && this.state.name && this.state.phoneNumber) {
      PostData( this.state).then((result) => {
        let response = result;
        console.log(result)
        if (response.userData) {
          sessionStorage.setItem('userData', JSON.stringify(response));
          this.setState({ redirectToReferrer: true });
       
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
          <Row type="flex" justify="center">
            <Col lg={9} sm={0} xs={0}>

              <div className="sidesection">
                <img src={mitlogo} />
                <h2>Welcome To MIT Social</h2>
                <hr />
              </div>

            </Col>
            <Col lg={15} sm={24} xs={24} className="centercontent">
              <div className="formsigninmit1">
                <div className="formarea">
                  <div className="formheading">
                    <p className="signfont">Sign Up </p>
                  </div>
                </div>
                <Row type="flex" justify="center">

                  <Col lg={10} sm={10} xs={24}>
                    <form className="formsinput">
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
                         <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                      <Input
                        placeholder="Username"
                        name="userName"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}

                        onChange={this.onChangeValue}
                        
                      />
                        <span style={{color: "red"}}>{this.state.errors["userName"]}</span>
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
                        name="email"
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        //<input ref="name" type="text" size="30" placeholder="Name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                        onChange={this.onChangeValue}
                        
                      />
                         <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                      <Input
                        placeholder=" Phone Number"
                        name="phoneNumber"
                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}

                        onChange={this.onChangeValue}
                        // value={this.state.fields["phoneNumber"]}
                      />
                        <span style={{color: "red"}}>{this.state.errors["phoneNumber"]}</span>
                      <Input
                        placeholder=" Password"
                        name="password"
                        name="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}

                        onChange={this.onChangeValue}
                       
                      />
                       <Input
                        placeholder="Confirm Password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        name="confirmPassword"

                        onChange={this.onChangeValue}
                      /> 


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

                  <div className="registerbtn">
                    <Button className="sbmtbtn" onClick={this.register}>Submit</Button>
                    <Button className="cnclbtn">Cancel</Button>
                    <p className="regtext"> Already Registered ? &nbsp;&nbsp;<a className="loginlink" href='/Signin' >Login</a> &nbsp;here</p>
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
