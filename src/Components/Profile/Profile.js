import React, { Component } from 'react';
import { Upload, Row, Col, Form, Input, Icon, Radio, Button, Modal, Select, notification } from 'antd';
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
import getStates from '../../Services/getStates';
import getCities from '../../Services/getCities';
import Data_Store from './../../redux';
import getUserInfo from '../../Services/getUserInfo';
import Image from '../Image/Image';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import ReactFileReader from 'react-file-reader';

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
      userProfile: {},
      userName: '',
      stateArray: [],
      cityArray: [],
      loading: false,
      visible: false,
      iconLoading: false,
      DispalyPicList: [],
      imagePicture: '',
      show: false,
      enableUser: false,
      cropImage: '',
      imageData: '',
      // preview: '',
      image: '',
      file: '',
      imageUrl: '',
      hideText: false,
      hideSaveButton: false
    };

    this.showModal = this.showModal.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.cropPictureUpload = this.cropPictureUpload.bind(this);

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
    console.log("user1", result);
    this.setState({ userProfile: result });
    console.log("userprofile", this.state.userProfile);
    this.setState({ user: result });
    this.setState({ avatar: sessionStorage.getItem("avatar") });
    getCities(this.state.user.state).then((result) => {
      this.setState({ cityArray: result })
    });
    if (this.state.userProfile.imageId) {
      this.setState({ imageUrl: 'http://mitapi.memeinfotech.com:5000/file/getImage?imageId=' + this.state.userProfile.imageId._id })
    } else if (this.state.userProfile.providerPic) {
      console.log(this.state.userProfile.providerPic);
      this.setState({ imageUrl: this.state.userProfile.providerPic })
    } else {
      this.setState({ imageUrl: User })
    }
    console.log("Image URL", this.state.imageUrl);
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
    this.setState({enableUser: true})
    let user = Object.assign({}, this.state.user);    //creating copy of object
    user[e.target.name] = e.target.value;                        //updating value
    this.setState({ user });
  }


  //on selecting city
  onChangeCity = (e) => {
    this.setState({enableUser: true})
    let user = Object.assign({}, this.state.user);    //creating copy of object
    user.city = e;                        //updating value
    this.setState({ user });
  }

  //on selecting state
  onChangeState = (e) => {
    this.setState({enableUser: true})
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
    this.setState({ show: true });
    this.setState({ hideSaveButton: false });
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
        let _base = this
        setTimeout(function () {
          _base.setState({ show: false });
          _base.openNotificationWithIcon('success', response.message);
        }, 2000);
        this.setState({ iconLoading: false });
      } else {
        let _base = this
        setTimeout(function () {
          _base.openNotificationWithIcon('error', response.message);
        }, 2000);
      }
      this.setState({ visible: false });
    }, (error) => {
      let _base = this
      setTimeout(function () {
        _base.openNotificationWithIcon('error', 'Connection error');
      }, 2000);
      this.setState({ iconLoading: false });
    });
  }


  handleCancel = () => {
    this.setState({ hideText: false });
    this.setState({ hideSaveButton: false });
  }

  handleCancelEdit = () => {
    this.setState({ visible: false });
    this.setState({ hideText: false });
  }

  // //image upload of profile pic
  // profilePicUpload = (e) => {
  //   // if (event.fileList.length != 0) {
  //     this.setState({ hideText: true });
  //     console.log("File selected", e);
  //     this.setState({ cropImage: e.base64 });
  //     console.log(this.state.cropImage)
  //     this.setState({ file: this.dataURLtoFile(this.state.imageUrl, 'hello.png') });
  //     var form = new FormData();
  //     form.append('file', this.state.file,'hello.png');
  //     profilePic(form).then((result) => {
  //       this.setState({
  //         DispalyPicList: []
  //       });
  //       if (result.error == false) {
  //         console.log(result);
  //         let userData = {
  //           _id: sessionStorage.getItem('userId'),
  //           imageId: result.upload
  //         }
  //         updateData(userData).then((response) => {
  //           if (response.error == false) {
  //             Data_Store.dispatch({
  //               type: 'ProfileData',
  //               value: response.user
  //             })
  //             this.openNotificationWithIcon('success', 'Display picture changed');
  //           } else {
  //             this.openNotificationWithIcon('error', response.message);
  //           }
  //         });
  //       } else {
  //         this.openNotificationWithIcon('error', result.message);
  //       }
  //     })
  //   // }
  // }

  edit = () => {
    console.log('Dispaly data');
  }

  // notification show
  openNotificationWithIcon = (type, content) => {
    notification[type]({
      message: type,
      description: content,
      duration: 1,
    });
  };

  // image file selected
  profilePicUpload = (e) => {
    this.setState({ hideText: true });
    this.setState({ hideSaveButton: true });
    console.log("File selected", e);
    this.setState({ cropImage: e.base64 });
    console.log(this.state.cropImage)
  }

  // crop image
  _crop() {
    let _base = this;
    this.setState({ image: this.refs.cropper.getCroppedCanvas().toDataURL() });
    console.log(this.refs.cropper);

    // let image = this.refs.cropper.getCroppedCanvas().toDataURL();
    this.refs.cropper.getCroppedCanvas().toBlob(function (image) {
      console.log(image);
      var file = new File([image], 'hello.png', { type: image.type, lastModified: Date.now() });
      console.log("file", file);
      _base.setState({ file: file });
    });
    // this.setState({ preview: this.refs.cropper.getCroppedCanvas().toDataURL() });
    // this.setState({ file: this.dataURLtoFile(this.state.image, 'hello.png') });
    console.log(this.state.file);
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(',');
    var arr1 = arr[0].split('/');
    var arr2 = arr1[1].split(';');
    var mime = arr2[0];
    console.log(mime);
    var bstr = this.atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: "image/" + mime });
  }


  // a to b converted
  atob = (input) => {
    console.log("Input", input);
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);

      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = input.indexOf(buffer);
    }

    return output;
  }

  // profile picture upload
  cropPictureUpload() {
    this.setState({ iconLoading: true });
    this.setState({ hideSaveButton: true });
    var form = new FormData();
    form.append('file', this.state.file);
    let _base = this
    profilePic(form).then(function (success) {
      _base.setState({ iconLoading: false });
      _base.setState({ hideSaveButton: false });
      _base.setState({ hideText: false });
      _base.setState({ visible: false });
      console.log(success);
      console.log("Success", success.upload._id);
      _base.setState({ imageData: success.upload });
      _base.updateProfileImage(_base.state.imageData);
    }, function (error) {
      console.log("Error", error);
      _base.setState({ iconLoading: false });
    })
  }

  // update profile picture with userdata
  updateProfileImage = (data) => {
    console.log(data);
    let userinfo = {
      _id: sessionStorage.getItem('userId'),
      imageId: data
    }
    updateData(userinfo).then((result) => {
      console.log(result);
      if (result.error == false) {
        Data_Store.dispatch({
          type: 'ProfileData',
          value: result.user
        })
        this.openNotificationWithIcon('success', 'Profile picture updated');
      } else {
        this.openNotificationWithIcon('error', result.message);
      }
      this.handleCancelEdit();
    }, function (error) {
      this.openNotificationWithIcon('error', 'Profile picture not updated');
      this.handleCancelEdit();
    });
  }

  render() {
    const Option = Select.Option;
    const { visible, loading } = this.state;

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    return (
      <div>
        <Loading
          show={this.state.show}
          color=" orange"
          showSpinner={false}

        />
        {/* profile view section start */}
        <section className="profilesec">

          <div className="procard">

            {/* Edit avatar */}

            <div className="userdetail">
              <div className="userpic">
                <img src={this.state.imageUrl} type='avatar' />
              </div>
              <Button onClick={this.showModal} className="vieweditbtn" title="Edit Profile"><Icon type="edit" /></Button>
              <p>{this.state.userProfile.name}</p>
              <h4>{this.state.userProfile.userName} </h4>
              {/* <h3>Senior manager at denali bank</h3> */}
            </div>
            {/* http://mitapi.memeinfotech.com:5000/file/getImage?imageId=5ace03782756be73145259a7 */}
            {/* http://mitapi.memeinfotech.com:5000/file/getImage?imageId=5ace03782756be73145259a7 */}

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
        {/* disabled={!this.state.enableUser} */}
        {/* ----------MODAL SECTION FOR EDIT PROFILE start------------- */}
        <Modal
          visible={visible}
          // title="Edit Intro"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <div>
              {this.state.hideText == false ?
                <Button key="back" onClick={this.handleCancelEdit} className="backbtn">Back</Button> :
                <Button key="back" onClick={this.handleCancel} className="backbtn">Back to Editdetails</Button>
              }
              {this.state.hideSaveButton == true ?
                <Button onClick={this.cropPictureUpload} loading={this.state.iconLoading} className="savebtn">Upload </Button> :
                <Button key="submit" loading={loading} loading={this.state.iconLoading} onClick={this.updateProfile} className="savebtn">Save</Button>

              }
            </div>
          ]}
          className="mitprofileEditmodal"
        >
          <Row>
            <Col span={24}>
              {this.state.hideText == false ?
                <div className="mitedituserback">
                  <h1 className="editIntro">Edit Intro</h1>
                  <div className="userpic">
                    <img src={this.state.imageUrl} />
                    {/* <Upload onChange={this.profilePicUpload} accept="image/*" fileList={this.state.DispalyPicList}>
                    <Button className="editbtn">
                      <Icon type="edit" />
                    </Button>
                  </Upload> */}
                    <ReactFileReader base64={true} handleFiles={this.profilePicUpload} accept="image/*" >
                      <Button className="editbtn">
                        <Icon type="edit" />
                      </Button>
                    </ReactFileReader>
                  </div>
                </div> : ""}
            </Col>
          </Row>


          {/* ----------------edit profile form start--------------- */}
          {
            this.state.hideText == false ?
              <Form className="editprofileform"  >


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
                        {this.state.stateArray.map((item, index) => {
                          return <Option key={index} value={item}>{item}</Option>
                        })}
                      </Select>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <Select value={this.state.user.city ? this.state.user.city : "City"} onChange={this.onChangeCity}>
                        {this.state.cityArray.map((item, index) => {
                          return <Option key={index} value={item.name}>{item.name}</Option>
                        })}
                      </Select>
                    </div>
                  </Col>
                </Row>
                {/* /city and state input end */}

              </Form>
              :

              <div>
                <div>
                  <Cropper
                    ref='cropper'
                    src={this.state.cropImage}

                    style={{ height: 400, width: '100%' }}
                    aspectRatio={16 / 9}
                    guides={false}
                    crop={this._crop.bind(this)} />
                </div>
                {/* <img
                  src={this.state.preview}
                /> */}

              </div>
          }
          {/* ----------------/ edit profile form end--------------- */}
        </Modal>
        {/* ----------MODAL SECTION FOR EDIT PROFILE end------------- */}
        < ToastContainer autoClose={2000} />
      </div>
    );
  }
}



export default Profile