import React, { Component } from 'react';
import { Row, Col, Input, Icon, Radio, Button, Modal, Select } from 'antd';
import Header from '../Header/Header.js';
import 'antd/dist/antd.css';
import './Wall.css';
import User from '../../Images/user10.jpg';
import Wallpostimg from '../../Images/wallimg.jpg';
import editprofileimg from '../../Images/editprofileimg.svg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class Wall extends Component {

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

    return (
      <div className="App">
        {/* navbar section start */}
        <Header></Header>
        {/* navbar section end */}

        {/* wall view section start */}
        <div className="wallcard">
          <div className="postsec">
            <p>Share an Article, Photo, Video or Idea</p>


            <Button onClick={this.showModal} className="postedit" title="Article"><Icon type="edit" />Write an Article</Button>
            <Button className="postimg" title="Images"><Icon type="camera-o" />Images</Button>
            <Button className="post" title="Post">Post</Button>
          </div>
        </div>

        {/* wall view section end */}

        {/* posted blog html start */}
        <div className="postedpartcard">
          <Row type="flex" justify="space-around" align="middle">
            <Col md={{ span: 2 }} sm={{ span: 3 }} xs={{ span: 3 }}>
              <div className="userpicpost">
                <img src={User} />
              </div>
            </Col>
            <Col md={{ span: 22 }} sm={{ span: 21 }} xs={{ span: 21 }}>
              <p>Jess Williams</p>
              <h3>Senior manager at denali bank</h3>
            </Col>
          </Row>
          <div className="postedimg">
            <img src={Wallpostimg} />
            <p>International Women's day</p>
            <h3>youtube</h3>
          </div>
          <div className="likecomment">
            <h3>2k likes</h3>
            <Button title="like"><Icon type="like-o" />Likes</Button>
            <Button title="comment"><Icon type="message" />Comment</Button>

          </div>
        </div>

        {/* posted blog html start */}


        {/* ----------MODAL SECTION write something  start------------- */}
        <Modal className="artlhead"
          visible={visible}
          title="Share Article"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Post
           </Button>,
          ]}
          className="mitprofileEditmodal"
        >



          {/* ----------------edit profile form start--------------- */}
          <form className="editprofileform">

            <Row gutter={24}>
              <Col span={24}>
                <form>
                

                <ReactQuill value="" className="textareheadng" placeholder="Headline"/>
                  <ReactQuill  placeholder="Write here .." className="textareawall" />

                </form>
              </Col>
            </Row>

          </form>
        </Modal>
        {/* ----------MODAL SECTION FOR write something end------------- */}

      </div>
    );
  }
}

export default Wall;
