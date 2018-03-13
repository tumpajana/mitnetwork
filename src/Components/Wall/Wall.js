import React, { Component } from 'react';
import { Upload, Row, Col, Input, Icon, Radio, Button, Modal, Select } from 'antd';
import Header from '../Header/Header.js';
import 'antd/dist/antd.css';
import './Wall.css';
import User from '../../Images/usr.jpg';
import Wallpostimg from '../../Images/wallimg.jpg';
import editprofileimg from '../../Images/editprofileimg.svg';
import ReactQuill from 'react-quill';
import WallPost from '../../Services/wallPost';
import WallGet from '../../Services/wallGet';
import 'react-quill/dist/quill.snow.css';
import usrimgwall from '../../Images/usr.jpg';
const { TextArea } = Input;
class Wall extends Component {
  state = {
    loading: false,
    visible: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      posts: {
        title: '',
        content: ''
      },
      postList:[]

    }
    this.postContent = this.postContent.bind(this);
    this.postTitle= this.postTitle.bind(this);
    this.socialPost = this.socialPost.bind(this);
    this.getPosts();
    
  }

  //postdata on server
  socialPost() {
    console.log('post')
    let dataSent = {
      title: this.state.posts.title,
      content: this.state.posts.content,
      userId: sessionStorage.getItem('userId')
    }
    WallPost(dataSent).then((result) => {
      console.log(result);
      this.getPosts();
    })
  }

  //get al post
  getPosts() {
    WallGet().then((result) => {
      console.log(result);
      this.setState({postList:result.result.filter((element) => {return (element.userId != null || element.userId != undefined)})});
    });
  }

 //post title 
 postTitle = (e) => {
  this.setState({
    posts: {
      title: document.getElementById("editor-title").innerText,
      content: this.state.posts.content
    } 
  })
}


  // post content
  postContent= (e) => {
    this.setState({
      posts: {
        title: this.state.posts.title,
        content: document.getElementById("editor-content").innerText
      }
    })
    console.log(this.state.posts.content)
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
    }, 2000);
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
          <div className="postsec clearfix">
            <form>
              <Row>
                <Col span={2}>

                  <div className="userprflimg">
                    <img src={usrimgwall} />
                  </div>
                </Col>
                <Col span={22}>
                  <div className="usrview">
                    <h4 className="usrnamewall">{this.state.posts.title}</h4>
                    <p className="degignationwall">{this.state.posts.content}</p>
                  </div>
                </Col>
              </Row>
              <Row type="flex" justify="center">

                <Col span={24}>

                  {/* <TextArea rows={4} placeholder="Write here .." className="showpost" /> */}
                  <div placeholder="Write here .." className="showpostall" >


                  </div>

                </Col>
              </Row>
            </form>

            <hr className="dividerwall" />

            <Row >

              <Col span={5}> <Button onClick={this.showModal} className="postedit" title="Article"><Icon type="edit" />Write an Article</Button></Col>
              <Col span={5}>

                <Upload >
                  <Button className="upldbtnwall">
                    <Icon type="upload" />Upload Image
              </Button>
                </Upload>
              </Col>
              <Col span={14}>


                <Button className="post" title="Post" onClick={this.socialPost}>Post</Button>
              </Col>

            </Row>

            {/* <Button className="postimg" title="Images"><Icon type="camera-o" />Images</Button> */}



          </div>
        </div>

        {/* wall view section end */}

        {/* posted blog html start */}
        { this.state.postList.map(function(item) {
                return   <div className="postedpartcard"  key={item._id}>
                <Row type="flex" justify="space-around" align="middle">
                  <Col md={{ span: 2 }} sm={{ span: 3 }} xs={{ span: 3 }}>
                    <div className="userpicpost">
                      <img src={User} />
                    </div>
                  </Col>
                  <Col md={{ span: 22 }} sm={{ span: 21 }} xs={{ span: 21 }}>
                    <p>{item.userId.userName}</p>
                    <h3>Senior manager at denali bank</h3>
                  </Col>
                </Row>
                <div className="postedimg">
                  <img src={Wallpostimg} />
                 <h1> {item.title}</h1>
                  {item.content}
                </div>
                <div className="likecomment">
                  <h3>2k likes</h3>
                  <Button title="like"><Icon type="like-o" />Likes</Button>
                  <Button title="comment"><Icon type="message" />Comment</Button>
      
                </div>
              </div>
            })
        }
      
        {/* <div className="postedpartcard"  ng-repeat="item in postList">
          <Row type="flex" justify="space-around" align="middle">
            <Col md={{ span: 2 }} sm={{ span: 3 }} xs={{ span: 3 }}>
              <div className="userpicpost">
                <img src={User} />
              </div>
            </Col>
            <Col md={{ span: 22 }} sm={{ span: 21 }} xs={{ span: 21 }}>
              <p>{item.userId.userName}</p>
              <h3>Senior manager at denali bank</h3>
            </Col>
          </Row>
          <div className="postedimg">
            <img src={Wallpostimg} />
            <p>{item.title}</p>
            <h3>{item.content}</h3>
          </div>
          <div className="likecomment">
            <h3>2k likes</h3>
            <Button title="like"><Icon type="like-o" />Likes</Button>
            <Button title="comment"><Icon type="message" />Comment</Button>

          </div>
        </div> */}

        {/* posted blog html start */}


        {/* ----------MODAL SECTION write something  start------------- */}
        <div className="modalcustom">
          <Modal className="artclhead"
            visible={visible}
            title="Share Article"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                Save
           </Button>,
            ]}
            className="mitprofileEditmodal"
          >
     


          {/* ----------------edit profile form start--------------- */}
          <form className="editprofileform">

            <Row gutter={24}>
              <Col span={24}>
                <form>


                  <ReactQuill id="editor-title" className="textareheadng" placeholder="Headline" name="title" onChange={this.postTitle} />
                  <ReactQuill   id="editor-content" placeholder="Write here .." className="textareawall" name="content" onChange={this.postContent} />

                </form>
              </Col>
            </Row>

          </form>
        </Modal>

        </div>
        {/* ----------MODAL SECTION FOR write something end------------- */}

      </div>
    );
  }
}

export default Wall;
