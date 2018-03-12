import React, { Component } from 'react';
import { Menu, Icon, Anchor } from 'antd';
import { Row, Col } from 'antd';
import './Header.css';
import navbarlogo from '../../Images/mitlogo.png';
import userpic from '../../Images/userprofilepic.jpg';
import { Redirect } from 'react-router-dom';
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
  this.state={
    redirectToReferrer: false
  }

    this.logout = this.logout.bind(this);
  }
 

  onClickButton = (ev) => {
    console.log(ev)
    if(ev.key === 'setting:2') { // light is the value of menuitem in string
    
      this.logout()
    } 
  
  }

  // logout and clear session storage
  logout() {
    console.log('menu item selected');
    sessionStorage.clear();
    this.setState({redirectToReferrer:true})

    
  }

  render() {

    // redirect to signin after logout
    if (this.state.redirectToReferrer) {
      return <Redirect to ="/Signin"/>
    }
    
    return (
      <div className="navbarsocial">
        <Row>
          <Col lg={12}>
            <Menu>
              <div className="navlogo">
                <Anchor className="logoanchor">
                  <Link href="#Home"><img src={navbarlogo} /></Link>
                </Anchor>
              </div>
            </Menu>
          </Col>
          <Col lg={12}>
            <div className="navbarright">
              <Menu
                onClick={this.onClickButton}
                selectedKeys={[this.state.current]}
                mode="horizontal"
               
              >
                <Menu.Item key="mail" >
                  <Icon type="home" />Home
             </Menu.Item>
                <Menu.Item >
                  <Icon type="usergroup-add" />My Networks
             </Menu.Item>
                <Menu.Item >
                  <Icon type="wechat" />Messaging
             </Menu.Item>

                <SubMenu title={<span><img type="setting" className="leftalign" src={userpic} />Me<Icon type="down" /></span>} className="headersubmenu">
                  <MenuItemGroup title="">
                    <Menu.Item key="setting:1" className="linkprfl">Edit Profile</Menu.Item>
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