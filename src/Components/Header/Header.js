import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';
import './Header.css';
import navbarlogo from '../../Images/mitlogo.png';
import userpic from '../../Images/userprofilepic.jpg';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div className="navbarsocial">
        <Row>
          <Col lg={12}>
            <Menu>
              <div className="navlogo">
                <img src={navbarlogo} />
              </div>
            </Menu>
          </Col>
          <Col lg={12}>
<div className="navbarright">
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="mail">
                <Icon type="home" />Home
             </Menu.Item>
             <Menu.Item >
                <Icon type="usergroup-add" />My Networks
             </Menu.Item>
             <Menu.Item >
                <Icon type="wechat" />Messaging
             </Menu.Item>
            
              <SubMenu title={<span><img type="setting" className="leftalign" src={userpic}/>Me</span>} className="headersubmenu">
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
