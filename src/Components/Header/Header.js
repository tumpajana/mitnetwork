import React, { Component } from 'react';
import { Menu, Icon, Anchor } from 'antd';
import { Row, Col } from 'antd';
import './Header.css';
import navbarlogo from '../../Images/mitlogo.png';
import userpic from '../../Images/userprofilepic.jpg';
import { Redirect, NavLink } from 'react-router-dom';
import getUserProfile from '../../Services/profileapi';
import Data_Store from './../../redux';
import isAuthenticated from '../../Services/auth';
import getUserInfo from '../../Services/getUserInfo';
import Image from '../Image/Image';
import User from '../../Images/avatar.png';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Link } = Anchor;

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      imageUrl: '',
      userProfile: {},
      username: '',
      userNameNew: '',
      current: 'mail',
      avatar: sessionStorage.getItem("avatar")
    }

    this.UserProfileData = this.UserProfileData.bind(this);
    if (sessionStorage.userId) {
      this.UserProfileData();
    }
    this.logout = this.logout.bind(this);
    let _base = this;
    isAuthenticated()
      .then(function (success) {
        console.log("Authenticated");
      }, function (error) {
        _base.logout();
      });


    //subscribe to profile store
    Data_Store.subscribe(() => {
      console.log(Data_Store.getState());
      let result = Data_Store.getState();
      _base.renderUser(result);
    })

  }


  onClickButton = (ev) => {
    if (ev.key === 'setting:2') { // light is the value of menuitem in string
      this.logout()
    } else {
      this.setState({
        current: ev.key,
      });
    }
  }

  // logout and clear session storage
  logout() {
    console.log('menu item selected');
    sessionStorage.clear();
    this.setState({ redirectToReferrer: true });
  }

  // get user profile details
  UserProfileData = () => {
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
    getUserProfile(sessionStorage.getItem("userId")).then((result) => {
      Data_Store.dispatch({
        type: 'ProfileData',
        value: result.result
      })
    });
  }

  renderUser = (result) => {
    let _base = this;
    _base.setState({ userProfile: result });
    _base.setState({ userName: result.name });
    _base.setState({ avatar: sessionStorage.getItem("avatar") });
    if (this.state.userProfile.imageId) {
      this.setState({ imageUrl: 'http://ec2-52-27-118-19.us-west-2.compute.amazonaws.com:5000/file/getImage?imageId=' + this.state.userProfile.imageId._id })
    } else if (this.state.userProfile.providerPic) {
      console.log(this.state.userProfile.providerPic);
      this.setState({ imageUrl: this.state.userProfile.providerPic })
    } else {
      this.setState({ imageUrl: User })
    }
  }

  render() {

    // redirect to signin after logout
    if (this.state.redirectToReferrer) {
      return <Redirect to="/login" />
    }

    return (
      <div className="navbarsocial">
        <Row>
          <Col lg={12} xs={10}>
            <Menu >
              <Menu.Item key="logo">
                <div className="navlogo">
                  <Anchor className="logoanchor">
                    <Link href="#Home"><img src={navbarlogo} /></Link>
                  </Anchor>
                </div>
              </Menu.Item>
            </Menu>
          </Col>
          <Col lg={12} xs={14}>
            <div className="navbarright">
              <Menu
                onClick={this.onClickButton}
                selectedKeys={[this.state.current]}
                mode="horizontal"
              >
                <Menu.Item key="mail">
                  <Icon type="home" /><NavLink to="/layout/wall">Home</NavLink>
                </Menu.Item>


                <SubMenu title={<span>{
                  <img type="setting" className="leftalign" src={this.state.imageUrl} />
                }{this.state.userName}<Icon type="down" /></span>} className="headersubmenu">
                  <MenuItemGroup title="">
                    <Menu.Item key="setting:1" className="linkprfl"><NavLink to="/layout/profile">Edit Profile</NavLink></Menu.Item>
                    <Menu.Item key="setting:2" className="linkprfl">Log out</Menu.Item>
                  </MenuItemGroup>
                </SubMenu>

              </Menu>
            </div>
          </Col>
        </Row>

      </div>
    );
  }

}

export default Header;


{/* <Menu.Item >
                  <Icon type="usergroup-add" />My Networks
             </Menu.Item> */}
{/* <Menu.Item >
                  <Icon type="wechat" />Messaging
             </Menu.Item> */}
