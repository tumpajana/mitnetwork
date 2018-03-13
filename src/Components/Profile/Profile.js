import React, { Component } from 'react';
import { Upload, Row, Col, Input, Icon, Radio, Button, Modal, Select } from 'antd';
import 'antd/dist/antd.css';
import './Profile.css';
import editprofileimg from '../../Images/editprofileimg.svg';
import placegholderimg from '../../Images/avatar.png';
import Header from '../Header/Header.js';
import User from '../../Images/user10.jpg';
import backprofile from '../../Images/backpro.svg';
import getUserProfile from '../../Services/profileapi';
import updateData from '../../Services/updateapi';
import ReactDOM from 'react-dom';
import profilePic from '../../Services/profilepicapi';


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        userName: '',
        email: '',
        name: '',
        phoneNumber: '',
        city: '',
        qualification: '',
        designation: '',
        state: '',
        redirectToReferrer: false,
      },

      userProfile: {}
    };

    this.show = this.show.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    // this.onChangeValue = this.onChangeValue.bind(this);
    if (sessionStorage.userId) {
      this.show();
    }
  };



 onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

 
  state = {
    loading: false,
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
    //  this.refs.username.value="abcd";
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
    console.log('button')
  }


  //onchange of input feild binding
  onChangeValue = (e) => {
    console.log(e)
    let userProfile = Object.assign({}, this.state.userProfile);    //creating copy of object
    userProfile[e.target.name] = e.target.value;                        //updating value
    this.setState({ userProfile });

  }


  //on selecting city
  onChangeCity = (e) => {
    let userProfile = Object.assign({}, this.state.userProfile);    //creating copy of object
    userProfile.city = e;                        //updating value
    this.setState({ userProfile });
  }

  //on selecting state
  onChangeState = (e) => {
    let userProfile = Object.assign({}, this.state.userProfile);    //creating copy of object
    userProfile.state = e;                        //updating value
    this.setState({ userProfile });
  }
  //update profile
  updateProfile() {
    let userData = {
      _id: sessionStorage.getItem('userId'),
      name: this.state.userProfile.name,
      userName: this.state.userProfile.userName,
      phoneNumber: this.state.userProfile.phoneNumber,
      city: this.state.userProfile.city,
      state: this.state.userProfile.state,
      qualification: this.state.userProfile.qualification,
      designation: this.state.userProfile.designation,
    }
    console.log(this.state.userProfile)
    updateData(userData).then((result) => {
      let response = result;
      console.log(result)
    });
  }


  handleCancel = () => {
    this.setState({ visible: false });
  }

  //  //show profile

  show = () => {
    //  this.refs.username.value="abcd";

    console.log('submit button');
    let _base = this;
    getUserProfile(sessionStorage.getItem("userId")).then((result) => {
      let response = result;
      console.log(this.refs);
      console.log(result);
      this.setState({ userProfile: result.result });

      console.log('userData...', this.state.userProfile)

      //  this.refs.username.value=this.state.userProfile.userName;

    });


  }
  preveiwProfile = (event) => {
    console.log(event.target.files)
    //   preveiwProfile(event) {

    let fileList = event.target.files;
    let fileTarget = fileList;
    let file = fileTarget[0];
    // this.names = file;
    console.log("File information :", file);
    var formData = new FormData();
    formData.append('file', event.target.files[0]);
    console.log(formData);
    // console.log(formData)
    //   profilePic(formData).then((result)=>{
    //     console.log(result)
    //   })
  }




  edit = () => {
    console.log('Dispaly data');


  }

  render() {

    const Option = Select.Option;
    const { visible, loading } = this.state;

    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    // const { firstName } = this.state;
    // const { lastName } = this.state;
    // const { userName } = this.state;
    // const { phn } = this.state;
    // const { address } = this.state;
    // const { education } = this.state;
    // const suffix = firstName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    // const suffix = lastName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    // const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    // const suffix = phn ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    // const suffix = address ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    // const suffix = education ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <div className="App">

        {/* navbar section start */}
        <Header></Header>
        {/* navbar section end */}

        {/* profile view section start */}
        <section className="profilesec">

          <div className="procard">
            <div className="userdetail">
              <div className="userpic">
                <img src={User} />
              </div>
              <Button onClick={this.showModal} className="vieweditbtn" title="Edit Profile"><Icon type="edit" /></Button>
              <p>{this.state.userProfile.name}</p>
              <h4>{this.state.userProfile.userName} </h4>
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
                      <p>{this.state.userProfile.email}</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>

                      <Icon type="mobile" />
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>{this.state.userProfile.phoneNumber}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row type="flex" justify="space-around" align="middle">
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>
                      <Icon type="home" />
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>{this.state.userProfile.city}</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>
                      <Icon type="environment-o" />
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>{this.state.userProfile.state}</p>
                    </Col>
                  </Row>

                </Col>
              </Row>
              <Row type="flex" justify="space-around" align="middle">
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>
                      <Icon type="book" />
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>{this.state.userProfile.qualification}</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>
                      <Icon type="profile" />
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>{this.state.userProfile.designation}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </section>
        {/* profile view section end */}

        {/* ----------MODAL SECTION FOR EDIT PROFILE start------------- */}
        <Modal
          visible={visible}
          title="Edit Intro"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel} className="backbtn">Back</Button>,
            <Button key="submit" loading={loading} onClick={this.updateProfile} className="savebtn">
              Save
                        </Button>,
          ]}
          className="mitprofileEditmodal"
        >
          <Row>
            <Col span={24}>
              <div className="mitedituserback">
                {/* <img src={editprofileimg} /> */}
                <div className="userimage">
                  {/* <img src={placegholderimg} /> */}
                  {/* <Button className="editbtn" title="Edit Profile Image">
                                  <Icon type="edit" />
                                </Button> */}
                  {/*<Upload >*/}
                  <Button className="editbtn">
                    <Icon type="edit" />
                    <Input type="file" name="myFile" onChange={this.preveiwProfile} />
                  </Button>

                  {/*</Upload>*/}
                </div>
              </div>
            </Col>
          </Row>


          {/* ----------------edit profile form start--------------- */}
          <form className="editprofileform">
            {/* name and username input start*/}
            <Row gutter={24}>
              <Col span={12}>
                <Input

                  placeholder="Enter your Name"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.onChangeValue}
                  ref={node => this.userNameInput = node}
                  defaultValue={this.state.userProfile.name}
                  name="name"
                />
              </Col>
              <Col span={12}>
                <Input
                  placeholder="Enter your Username"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.onChangeValue}
                  ref={node => this.userNameInput = node}
                  defaultValue={this.state.userProfile.userName}
                  name="userName"
                />
              </Col>
            </Row>
            {/* name and username input end*/}

            {/* phone no and qualification input start */}
            <Row gutter={24}>
              <Col span={12}>
                <Input
                  placeholder="Enter your Designation"
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.onChangeValue}
                  ref={node => this.userNameInput = node}
                  defaultValue={this.state.userProfile.designation}
                  name="designation"
                />
              </Col>
              <Col span={12}>
                <Input
                  placeholder="Enter your Qualification"
                  prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.onChangeValue}
                  ref={node => this.userNameInput = node}
                  name="qualification"
                />
              </Col>
            </Row>
            {/* /phone no and qualification input end */}


            {/* city and state input start */}
            <Row gutter={24}>
              <Col span={12}>
                <div>
                  <Select defaultValue="0" name="city" onChange={this.onChangeCity}>
                    <Option value="0">City</Option>
                    <Option value="Kolkata">Kolkata</Option>
                    <Option value="Delhi">Delhi</Option>
                    <Option value="Pune">Pune</Option>
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Select defaultValue="0" onChange={this.onChangeState}>
                    <Option value="0">State</Option>
                    <Option value="West Bengal">West Bengal</Option>
                    <Option value="Uttar Pradesh">Uttar Pradesh</Option>
                  </Select>
                </div>
              </Col>
            </Row>
            {/* /city and state input end */}


            {/* city and state input start */}
            {/*<Row gutter={24}>
              <Col span={24}>
                <div>
                  <Input
                    placeholder="Enter your Address"
                    prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onChange={this.onChangeValue}
                    ref={node => this.userNameInput = node}
                    name="address"
                  />
                </div>
              </Col>
            </Row>*/}
            {/* /city and state input end */}

          </form>
          {/* ----------------/ edit profile form end--------------- */}





        </Modal>
        {/* ----------MODAL SECTION FOR EDIT PROFILE end------------- */}

      </div>
    );
  }
}



export default Profile;