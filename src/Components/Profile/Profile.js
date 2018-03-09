import React, { Component } from 'react';
import { Row, Col,Input, Icon, Radio, Button, Modal,Select } from 'antd';
import 'antd/dist/antd.css';
import './Profile.css';
import editprofileimg from '../../Images/editprofileimg.svg';
import placegholderimg from '../../Images/avatar.png';


class Profile extends Component {
  state = {
    loading: false,
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
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
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open
        </Button>
        <Modal
          visible={visible}
          title="Edit Intro"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Back</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Save
            </Button>,
          ]}
          className="mitprofileEditmodal"
        >
          <Row>
            <Col span={24}>
              <div className="mitedituserback">
                 <img src={editprofileimg} />
                 <div className="userimage">
                    {/* <img src={placegholderimg} /> */}
                    <Button className="editbtn">
                      <Icon type="edit" />
                    </Button>
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
                  onChange={this.onChangeUserName}
                  ref={node => this.userNameInput = node}
                />
                </Col>
                <Col span={12}>
                <Input
                  placeholder="Enter your Username"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.onChangeUserName}
                  ref={node => this.userNameInput = node}
                />
                </Col>
              </Row>
            {/* name and username input end*/}

            {/* phone no and qualification input start */}
              <Row gutter={24}>
                <Col span={12}>
                <Input
                  placeholder="Enter your Phone No"
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.onChangeUserName}
                  ref={node => this.userNameInput = node}
                />
                </Col>
                <Col span={12}>
                <Input
                  placeholder="Enter your Qualification"
                  prefix={<Icon type="book" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.onChangeUserName}
                  ref={node => this.userNameInput = node}
                />
                </Col>
              </Row>
            {/* /phone no and qualification input end */}


            {/* city and state input start */}
            <Row gutter={24}>
                <Col span={12}>
                <div>
                  <Select defaultValue="0" onChange={handleChange}>
                    <Option value="0">City</Option>
                    <Option value="1">Kolkata</Option>
                    <Option value="2">Delhi</Option>
                    <Option value="3">Pune</Option>
                  </Select>
                </div>
                </Col>
                <Col span={12}>
                <div>
                  <Select defaultValue="0" onChange={handleChange}>
                    <Option value="0">State</Option>
                    <Option value="1">West Bengal</Option>
                    <Option value="2">Uttar Pradesh</Option>
                  </Select>
                </div>
                </Col>
            </Row>
            {/* /city and state input end */}


            {/* city and state input start */}
            <Row gutter={24}>
                <Col span={24}>
                <div>
                <Input
                  placeholder="Enter your Address"
                  prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={this.onChangeUserName}
                  ref={node => this.userNameInput = node}
                />
                </div>
                </Col>
            </Row>
            {/* /city and state input end */}

          </form>
          {/* ----------------/ edit profile form end--------------- */}





        </Modal>
      </div>
    );
  }
}

export default Profile;