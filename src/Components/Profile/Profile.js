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
import { ToastContainer, toast } from 'react-toastify';
import { Cropper } from 'react-image-cropper'
import getStates from '../../Services/getStates';
import getCities from '../../Services/getCities';
// import 'react-image-crop/dist/ReactCrop.css';
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
        redirectToReferrer: false,
      },
      imagUrl: '',
      userProfile: {},
      userName: '',
      stateArray: [],
      cityArray: [],

    };

    this.UserProfileData = this.UserProfileData.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    // this.onChangeValue = this.onChangeValue.bind(this);
    this.myimagecropper = this.myimagecropper.bind(this);
    if (sessionStorage.userId) {
      this.UserProfileData();
    }

    //get states
    getStates().then((result) => {
      console.log(result);
      // this.setState({ stateArray: result});
      this.setState({ stateArray: result });
      console.log("states",this.state.stateArray);
    });

  

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
    getCities(e).then((result) => {
      console.log(result);
      this.setState({ cityArray: result })
      console.log(this.state.cityArray);
    });
    

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
      console.log(result);
      if (response.error == false) {
        toast.success("Profile Updated Successfuly!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      console.log("Close")
      this.setState({ visible: false });
    });
  }


  handleCancel = () => {
    this.setState({ visible: false });
  }

  // get user profile details
  UserProfileData = () => {
    let _base = this;
    getUserProfile(sessionStorage.getItem("userId")).then((result) => {
      let response = result;
      console.log(this.refs);
      console.log(result);
      this.setState({ userProfile: result.result });
      this.setState({ userName: result.result.name });
      console.log(this.state.userName);
      console.log('userData...', this.state.userProfile);

      if (this.state.userProfile.imageId) {
        this.setState({ imageUrl: 'http://mitapi.memeinfotech.com:5000/file/getImage?imageId=' + this.state.userProfile.imageId._id })
      } else if (this.state.userProfile.providerPic) {
        console.log(this.state.userProfile.providerPic);
        this.setState({ imageUrl: this.state.userProfile.providerPic })
      }
    });
  }

  //image upload of profile pic
  profilePicUpload = (event) => {
    console.log(event);
    console.log(event.fileList)
    let fileList = event.fileList[0];
    // let fileTarget = fileList;
    let file = fileList.originFileObj;
    console.log("File information :", file);
    var form = new FormData();
    form.append('file', file, file.name);
    profilePic(form).then((result) => {
      console.log('pic uploaded', result);
      if (result.error == false) {
        toast.success("Image Uploaded Successfuly!", {
          position: toast.POSITION.TOP_CENTER,
        });
        // console.log(result.upload.filr._id)
        this.setState({ imageUrl: 'http://mitapi.memeinfotech.com:5000/file/getImage?imageId=' + result.upload._id })
        let userData = {
          _id: sessionStorage.getItem('userId'),
          imageId: result.upload._id
        }
        updateData(userData).then((result) => {
          let response = result;
          console.log(result);
          this.setState({ visible: false });
          // this.UserProfileData();
        });
      }
    })
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

        <Header ></Header>
        {/* navbar section end */}

        {/* profile view section start */}
        <section className="profilesec">

          <div className="procard">
            <div className="userdetail">
              <div className="userpic">{
                (this.state.userProfile.imageId || this.state.userProfile.providerPic) ? <img src={this.state.imageUrl} /> : <img src={User} />
              }
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
            <Button key="submit" loading={loading} onClick={this.updateProfile} className="savebtn">
              Save
                        </Button>,
          ]}
          className="mitprofileEditmodal"
        >
          <Row>
            <Col span={24}>
              <div className="mitedituserback">
                <h1 class="editIntro">Edit Intro</h1>
                <div className="userpic">{
                  (this.state.userProfile.imageId || this.state.userProfile.providerPic) ? <img src={this.state.imageUrl} /> : <img src={placegholderimg} />
                }
                  <Upload onChange={this.profilePicUpload} >
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
                  <Select value={this.state.userProfile.state ? this.state.userProfile.state : "State"} onChange={this.onChangeState}>
                    {/* <Option value="0">State</Option> */}
                    {this.state.stateArray.map((item) => {
                      return <Option value={item}>{item}</Option> 
                    })}
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Select value={this.state.userProfile.city ? this.state.userProfile.city : "City"} onChange={this.onChangeCity}>
                    {/* <Option value="0">City</Option> */}
                    {this.state.cityArray.map((item) => {
                    return<Option value={item.name}>{item.name}</Option>
                  })}
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
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}



export default Profile;