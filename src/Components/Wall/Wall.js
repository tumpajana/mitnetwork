import React, { Component } from 'react';
import { Row, Col,Input, Icon, Radio, Button, Modal,Select } from 'antd';
import Header from '../Header/Header.js';
import 'antd/dist/antd.css';
import './Wall.css';

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

    return (
      <div className="App">
       {/* navbar section start */}
          <Header></Header>
       {/* navbar section end */}

       {/* wall view section start */}
         <div className="wallcard">
           <div className="postsec">
             <p>Share an Article, Photo, Video or Idea</p>
             <hr></hr>
             <Button  className="postsec" title="Article"><Icon type="edit" />Write an Article</Button>
             <Button  className="postsec" title="Images"><Icon type="camera-o" />Images</Button>
             <Button  className="post" title="Post">Post</Button>
           </div>
         </div>

       {/* wall view section end */}
      </div>
    );
  }
}

export default Wall;
