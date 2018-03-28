import React, { Component } from 'react';
import { Menu, Icon, Anchor } from 'antd';
import { Row, Col } from 'antd';
import './Header.css';
import navbarlogo from '../../Images/mitlogo.png';
import userpic from '../../Images/userprofilepic.jpg';
import { Redirect,NavLink } from 'react-router-dom';
import getUserProfile from '../../Services/profileapi';
// import { Redirect, NavLink } from 'react-router-dom';
import isAuthenticated from '../../Services/auth';

// import Wall from '../Components/Wall';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Link } = Anchor;

class Header extends Component {
  state = {
    current: 'mail',
   
  }
  constructor(props) {

    super(props);
    this.state = {
      redirectToReferrer: false,
       imageUrl:'',
    userProfile: {},
    username:'',
    userNameNew: '',
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
  }


  onClickButton = (ev) => {
    if (ev.key === 'setting:2') { // light is the value of menuitem in string
      this.logout()
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
    getUserProfile(sessionStorage.getItem("userId")).then((result) => {
      // debugger;
      let response = result;
      console.log(this.refs);
      console.log(result);
      this.setState({ userProfile: result.result });
      this.setState({ userName: result.result.name });
      console.log('userData...', this.state.userProfile);
      if (this.state.userProfile.imageId) {
        this.setState({ imageUrl: 'http://mitapi.memeinfotech.com:5000/file/getImage?imageId=' + this.state.userProfile.imageId._id })
        console.log( this.setState({ imageUrl: 'http://mitapi.memeinfotech.com:5000/file/getImage?imageId=' + this.state.userProfile.imageId._id }));
      }else if(this.state.userProfile.providerPic){
      console.log(this.state.userName);
        console.log(this.state.userProfile.providerPic);
        this.setState({ imageUrl: this.state.userProfile.providerPic })
      }
    });
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
              <div className="navlogo">
                <Anchor className="logoanchor">
                  <Link href="#Home"><img src={navbarlogo} /></Link>
                </Anchor>
              </div>
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
                  <Icon type="home" /><NavLink to="/wall">Home</NavLink>
             </Menu.Item>
                {/* <Menu.Item >
                  <Icon type="usergroup-add" />My Networks
             </Menu.Item> */}
                {/* <Menu.Item >
                  <Icon type="wechat" />Messaging
             </Menu.Item> */}

                <SubMenu title={<span>{
  (this.state.userProfile.imageId || this.state.userProfile.providerPic) ? <img  type="setting" className="leftalign"src={this.state.imageUrl} /> : <img type="setting" className="leftalign" src={userpic} />
}Me<Icon type="down" /></span>} className="headersubmenu">
                  <MenuItemGroup title="">
                    <Menu.Item key="setting:1" className="linkprfl"><NavLink to="/profile">Edit Profile</NavLink></Menu.Item>
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
// onClick={this.logout}
