import React, { Component } from 'react';
import { Upload, Row, Col, Input, Icon, Radio, Button, Modal, Select, notification } from 'antd';
import 'antd/dist/antd.css';
import './Profile.css';
import editprofileimg from '../../Images/avatar.png';
import placegholderimg from '../../Images/avatar.png';
import Header from '../Header/Header.js';
import User from '../../Images/avatar.png';
import backprofile from '../../Images/backpro.svg';
import getUserProfile from '../../Services/profileapi';
import updateData from '../../Services/updateapi';
import ReactDOM from 'react-dom';
import profilePic from '../../Services/profilepicapi';
import { ToastContainer, toast } from 'react-toastify';
import { Cropper } from 'react-image-cropper'
import getStates from '../../Services/getStates';
import getCities from '../../Services/getCities';
import Data_Store from './../../redux';
import getUserInfo from '../../Services/getUserInfo';
import Image from '../Image/Image';

class Profile extends Component {
  constructor(props) {
    super(props);


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
        imageId: ''
      },
      imagUrl: '',
      userProfile: {},
      userName: '',
      stateArray: [],
      cityArray: [],
      loading: false,
      visible: false,
      iconLoading: false,
      DispalyPicList: []
    };

    // getImage('5ac04a2349da1517aa25d328');

    this.showModal = this.showModal.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.myimagecropper = this.myimagecropper.bind(this);


    // get states
    getStates()
      .then((result) => {
        this.setState({ stateArray: result });
      });

    let _base = this;
    getUserInfo()
      .then(function (result) {
        Data_Store.dispatch({
          type: 'ProfileData',
          value: result
        })
      }, function (error) {
        console.log(error);
      });

    // subscribe to store for profile data
    Data_Store.subscribe(() => {
      console.log(Data_Store.getState());
      let result = Data_Store.getState();
      _base.renderUser(result);
    })
  };


  renderUser = (result) => {
    console.log("user", result);
    this.setState({ userProfile: result });
    this.setState({ user: result });
    this.setState({ avatar: sessionStorage.getItem("avatar") });
    getCities(this.state.user.state).then((result) => {
      this.setState({ cityArray: result })
    });
  }




  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }


  //onchange of input feild binding
  onChangeValue = (e) => {
    let user = Object.assign({}, this.state.user);    //creating copy of object
    user[e.target.name] = e.target.value;                        //updating value
    this.setState({ user });
  }


  //on selecting city
  onChangeCity = (e) => {
    let user = Object.assign({}, this.state.user);    //creating copy of object
    user.city = e;                        //updating value
    this.setState({ user });
  }

  //on selecting state
  onChangeState = (e) => {
    let user = Object.assign({}, this.state.user);    //creating copy of object
    user.state = e;                        //updating value
    this.setState({ user });
    getCities(e).then((result) => {
      this.setState({ cityArray: result });
      this.onChangeCity(null);
    });
  }

  //update profile
  updateProfile() {
    this.setState({ iconLoading: true });
    let userData = {
      _id: sessionStorage.getItem('userId'),
      name: this.state.user.name,
      userName: this.state.user.userName,
      phoneNumber: this.state.user.phoneNumber,
      city: this.state.user.city,
      state: this.state.user.state,
      qualification: this.state.user.qualification,
      designation: this.state.user.designation,
    }
    updateData(userData).then((result) => {
      let response = result;
      console.log(response);
      if (response.error == false) {
        Data_Store.dispatch({
          type: 'ProfileData',
          value: response.user
        })
        this.openNotificationWithIcon('success', response.message);
        this.setState({ iconLoading: false });
      } else {
        this.openNotificationWithIcon('error', response.message);
      }
      this.setState({ visible: false });
    }, (error) => {
      this.openNotificationWithIcon('error', 'Connection error');
      this.setState({ iconLoading: false });
    });
  }


  handleCancel = () => {
    this.setState({ visible: false });
  }

  //image upload of profile pic
  profilePicUpload = (event) => {
    if (event.fileList.length != 0) {
      let fileList = event.fileList[0];
      let file = fileList.originFileObj;
      var form = new FormData();
      form.append('file', file, file.name);
      profilePic(form).then((result) => {
        this.setState({
          DispalyPicList: []
        });
        if (result.error == false) {
          console.log(result);
          let userData = {
            _id: sessionStorage.getItem('userId'),
            imageId: result.upload
          }
          updateData(userData).then((response) => {
            if (response.error == false) {
              Data_Store.dispatch({
                type: 'ProfileData',
                value: response.user
              })
              this.openNotificationWithIcon('success', 'Display picture changed');
            } else {
              this.openNotificationWithIcon('error', response.message);
            }
          });
        } else {
          this.openNotificationWithIcon('error', result.message);
        }
      })
    }
  }

  //image cropper
  myimagecropper = (e) => {
    let x = this.refs.myimage.crop()
    console.log(x)
    const values = this.refs.myimage.values()
    console.log(values)
  }


  edit = () => {
    console.log('Dispaly data');
  }

  // notification show
  openNotificationWithIcon = (type, content) => {
    notification[type]({
      message: type,
      description: content,
    });
  };


  render() {
    const Option = Select.Option;
    const { visible, loading } = this.state;

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    return (
      <div>
        {/* profile view section start */}
        <section className="profilesec">

          <div className="procard">
            <div className="userdetail">
              <div className="userpic">
                <Image src={this.state.avatar} type='avatar' />
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

                      {this.state.userProfile.phoneNumber ? <Icon type="mobile" /> : ''}
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
                      {this.state.userProfile.city ? <Icon type="home" /> : ''}
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>{this.state.userProfile.city}</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>
                      {this.state.userProfile.state ? <Icon type="environment-o" /> : ''}
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
                      {this.state.userProfile.qualification ? <Icon type="book" /> : ''}
                    </Col>
                    <Col md={{ span: 19 }} sm={{ span: 21 }} xs={{ span: 16 }}>
                      <p>{this.state.userProfile.qualification}</p>
                    </Col>
                  </Row>
                </Col>
                <Col md={{ span: 10 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                  <Row>
                    <Col md={{ span: 5 }} sm={{ span: 5 }} xs={{ span: 8 }}>
                      {this.state.userProfile.designation ? <Icon type="profile" /> : ''}
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
          // title="Edit Intro"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel} className="backbtn">Back</Button>,
            <Button key="submit" loading={loading} loading={this.state.iconLoading} onClick={this.updateProfile} className="savebtn">
              Save
            </Button>
          ]}
          className="mitprofileEditmodal"
        >
          <Row>
            <Col span={24}>
              <div className="mitedituserback">
                <h1 className="editIntro">Edit Intro</h1>
                <div className="userpic">
                  <Image src={this.state.avatar} type='avatar' />
                  <Upload onChange={this.profilePicUpload} accept="image/*" fileList={this.state.DispalyPicList}>
                    <Button className="editbtn">
                      <Icon type="edit" />
                    </Button>
                  </Upload>
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
                  prefix={<Icon type="profile" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                  defaultValue={this.state.userProfile.qualification}
                />
              </Col>
            </Row>
            {/* /phone no and qualification input end */}


            {/* city and state input start */}
            <Row gutter={24}>
              <Col span={12}>
                <div>
                  <Select ref="state" value={this.state.user.state ? this.state.user.state : "State"} onSelect={this.onChangeState}>
                    {this.state.stateArray.map((item,index) => {
                      return <Option key={index} value={item}>{item}</Option>
                    })}
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Select value={this.state.user.city ? this.state.user.city : "City"} onChange={this.onChangeCity}>
                    {this.state.cityArray.map((item,index) => {
                      return <Option key={index} value={item.name}>{item.name}</Option>
                    })}
                  </Select>
                </div>
              </Col>
            </Row>
            {/* /city and state input end */}

          </form>
          {/* ----------------/ edit profile form end--------------- */}
        </Modal>
        {/* ----------MODAL SECTION FOR EDIT PROFILE end------------- */}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}



export default Profile;