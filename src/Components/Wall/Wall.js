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
import { ToastContainer, toast } from 'react-toastify';
import postLike from '../../Services/postLikeApi';
import Post from "../Posts/post";
import camera from '../../Images/camera.png';
import profilePic from '../../Services/profilepicapi';
import commentPost from "../../Services/postCommentApi";
import getPostComments from "../../Services/getPostCommentsApi";
import getUserProfile from '../../Services/profileapi';

import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';



const { TextArea } = Input;
class Wall extends Component {
  state = {
    loading: false,
    visible: false,
    showPreviewIcon: true,
    showcomment: false
  }

  constructor(props) {
    super(props);
    this.state = {
      posts: {
        title: '',
        content: ''
      },
      postList: [],
      comments: {
        comment: '',
        postid: ''
      },
      imageId: [],
      profileData: {},
      userInfo: {},
      imageUrl: '',
      cPostid: '',
      files: []
    }

    this.postContent = this.postContent.bind(this);
    this.postTitle = this.postTitle.bind(this);
    this.socialPost = this.socialPost.bind(this);
    this.postLike = this.postLike.bind(this);
    this.imageUpload = this.imageUpload.bind(this);
    this.writeComment = this.writeComment.bind(this);
    this.getProfileData = this.getProfileData.bind(this);
    this.showCommentBox = this.showCommentBox.bind(this);

    this.getPosts();
    if (sessionStorage.userId) {
      this.getProfileData()
    }
  }




  //postdata on server
  socialPost() {
    console.log('post')
    if ((this.state.posts.content)) {
      if (this.state.files.length != 0) {
        let _base = this;
        this.uploadFiles()
          .then(function (success) {
            var dataSent = {
              title: _base.state.posts.title,
              content: _base.state.posts.content,
              userId: sessionStorage.getItem('userId'),
              imageId: _base.state.imageId
            }
            _base.createPost(dataSent);
          });
      }
      else {
        var dataSent = {
          title: this.state.posts.title,
          content: this.state.posts.content,
          userId: sessionStorage.getItem('userId'),
        }
        this.createPost(dataSent);
      }
    }
    else {
      toast.warn(" No content for this post!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  // actual api call wrapper to create a post of any type
  createPost = (postData) => {
    WallPost(postData).then((result) => {
      console.log(result);
      toast.success("Post Uploaded Successfuly!", {
        position: toast.POSITION.TOP_CENTER,
      });
      this.setState({
        posts: {
          title: "",
          content: ""
        }
      })
      console.log(this.refs.quill_content)
      this.setState({ imageId: [] })
      this.setState({ showPreviewIcon: false })
      this.getPosts();

    })
  }

  //get all post
  getPosts() {
    WallGet().then((result) => {
      console.log(result);
      if (result.result.length != 0) {
        this.setState({ postList: result.result.filter((element) => { return (element.userId != null || element.userId != undefined) }) });
      }
    });
    // console.log(strip(this.state.postList[0]))
    // console.log(this.state.postList[0].innerText)
  }

  //post title 
  postTitle = (e) => {
    if (this.refs.quill_title.getEditorContents()) {
      this.setState({
        posts: {
          title: this.refs.quill_title.getEditorContents(),
          content: this.state.posts.content
        }
      })
    }

  }


  // post content
  postContent = (e) => {
    console.log(e)
    this.setState({
      posts: {
        title: '',
        content: this.refs.quill_content.getEditorContents()
      }

    })
    console.log(this.refs.quill_content);
  }

  //postlike
  postLike(id) {
    console.log('mjhngfds')
    console.log(id)
    let likeData = {
      userId: sessionStorage.getItem("userId"),
      postId: id
    }

    postLike(likeData).then((result) => {
      let response = result;
      console.log(result)
      // toast.success("Post Liked Successfuly!", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      this.getPosts();
    });
  }

  // upload image 
  imageUpload = (event) => {
    this.setState({
      files: []
    });
    for (let i = 0; i < event.fileList.length; i++) {
      let fileList = event.fileList[i];
      let file = fileList.originFileObj;
      console.log("File information :", file);
      let files = this.state.files;
      files.push(file);
      this.setState({
        files: files
      });
    }
  }

  uploadFiles = () => {
    let _base = this;
    _base.setState({
      imageId: []
    });
    let length = _base.state.files.length;
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < length; i++) {
        let file = _base.state.files[i];
        var form = new FormData();
        form.append('file', file, file.name);
        profilePic(form).then((result) => {
          console.log(result);
          let id = result.upload._id;
          let ids = _base.state.imageId;
          ids.push(id);
          _base.setState({
            imageId: ids
          });
        })
        if (i == length - 1) {
          resolve(true);
        }
      }
    });
  }

  // get comments for a post
  getComments(id) {
    getPostComments(id).then((result) => {
      console.log(result);
      // if (result.result.comments.length != 0) {
      //   this.setState({ commentList: result.result.comments })
      // }
      this.setState({ showcomment: true })
    })
  }


  // write comment in comment box
  writeComment(i, e) {
    console.log(i)
    console.log(e.target.value);
    console.log(i)
    this.setState({
      comments: {
        comment: e.target.value,
        postid: i
      }
    })
    console.log(this.state.comments)
  }

  // post comment entered
  postComment = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.value = "";
      console.log(this.state.comments);

      let data = {
        comment: this.state.comments.comment,
        postId: this.state.comments.postid,
        userId: sessionStorage.getItem('userId')
      }
      commentPost(data).then((result) => {
        console.log('comment', result);
        if (result.error == false) {
          toast.success("Commented on Post Successfuly!", {
            position: toast.POSITION.TOP_CENTER,
          });
          this.getPosts();
          this.showCommentBox(result.result._id)
          // this.getComments(result.result._id);
          this.setState({
            comments: {
              comment: "",
              postid: ""
            }
          })

        }

      })

    }
  }

  //get user profile data
  getProfileData() {
    getUserProfile(sessionStorage.getItem("userId")).then((result) => {
      let response = result;
      console.log(result);
      this.setState({ userInfo: result.result });

      if (this.state.userInfo.imageId) {
        this.setState({ imageUrl: 'http://mitapi.memeinfotech.com:5000/file/getImage?imageId=' + this.state.userInfo.imageId._id })
      } else if (this.state.userInfo.providerPic) {
        console.log(this.state.userInfo.providerPic);
        this.setState({ imageUrl: this.state.userInfo.providerPic })
      }

    });
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
      console.log("Quill Title data", this.refs.quill_title.getEditorContents());
      console.log("Quill Content data", this.refs.quill_content.getEditorContents());
    }, 2000);
    // if(!(this.refs.quill_title.getEditorContents() && this.refs.quill_content.getEditorContents())){
    //   // alert("please enter field");
    //   toast.warning("Field is empty!", {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    // }
    // else{
    //   alert("");
    // }
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  // show comment box
  showCommentBox = (e) => {
    console.log(e)
    console.log('comment box')
    if (e == this.state.cPostid) {
      this.setState({ showcomment: !this.state.showcomment })
    }
    else {
      this.setState({ showcomment: true });
      this.state.cPostid = e;
    }

    // if (this.state.showcomment)

    // else this.state.cPostid = "";
  }



  render() {
    const Option = Select.Option;
    const { visible, loading } = this.state;
    const { showcomment } = this.state;
    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    return (
      <div className="App">
        {/* navbar section start */}
        <Header></Header>
        {/* navbar section end */}

        {/* wall view section start */}
        <form className="postarticlesec">
          <div className="wallcard">
            <div className="usercard">
              <div className="postsec clearfix">

                <Row>
                  <form>
                    <Col span={2}>

                      <div className="userprflimg">
                        {
                          (this.state.userInfo.imageId || this.state.userInfo.providerPic) ? <img src={this.state.imageUrl} /> : <img src={User} />
                        }
                      </div>
                    </Col>
                    <Col span={22}>
                      <div className="usrview">
                        <h3>{this.state.userInfo.userName}</h3>
                        <p>{this.state.userInfo.designation}</p>
                      </div>

                    </Col>
                  </form>
                </Row>
              </div>
              <div className="textSection">
                <Row>
                  <Col span={24}>

                    <ReactQuill ref="quill_content" id="editor-content" className="textareheadng" placeholder="Write an article here" name="content" onChange={this.postContent} />
                    {/* <ReactQuill ref="quill_content" id="editor-content" placeholder="Write here .." className="textareawall" name="content" onChange={this.postContent} /> */}


                  </Col>
                </Row>
              </div>
              <Row type="flex" justify="center">

                <Col span={24}>

                  {/* <TextArea rows={4} placeholder="Write here .." className="showpost" /> */}
                  <div placeholder="Write here .." className="showpostall" >


                  </div>

                </Col>
              </Row>


              <hr className="dividerwall" />
              <form className="uploadimgsec">
                <Row >

                  {/* <Col span={5}> <Button onClick={this.showModal} className="postedit" title="Article"><Icon type="edit" />Write an Article</Button></Col> */}
                  <div className="uploadalign">
                    <Col span={10}>

                      <Upload className='upload-list-inline' onChange={this.imageUpload}
                        showUploadList={() => { this.state.showPreviewIcon }}
                        multiple="true" listType="picture-card"
                      // listType="picture"
                      >

                        <Button className="upldbtnwall">
                          <Icon type="upload" />Upload Image
              </Button>
                      </Upload>
                    </Col>
                  </div>
                  <Col span={14}>
                    <Button className="post" title="Post" onClick={this.socialPost}>Post</Button>
                  </Col>

                </Row>
              </form>
            </div>
          </div>
        </form>
        {/* wall view section end */}

        {/* posted blog html start */}
        {this.state.postList.map((item, pIndex) => {
          return <div key={item._id}>
            <div className="postedpartcard">
              <div className="mitpic">
                <Row type="flex" justify="space-around" align="middle">
                  <Col md={{ span: 2 }} sm={{ span: 3 }} xs={{ span: 3 }}>
                    <div className="userpicpost">{
                      (item.userId.imageId) ? <img src={"http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + item.userId.imageId._id} /> : (item.userId.providerPic) ? <img src={item.userId.providerPic} /> : <img src={User} />
                    }
                    </div>
                  </Col>
                  <Col md={{ span: 22 }} sm={{ span: 21 }} xs={{ span: 21 }}>
                    <p>{item.userId.userName}</p>
                    <h3>{item.userId.designation}</h3>
                  </Col>
                </Row>
                <div className="postedimg onlytext">
                  {item.imageId ? (item.imageId.file.mimetype == "image/png") ? <img src={'http://mitapi.memeinfotech.com:5000/file/getImage?imageId=' + item.imageId._id} />
                    : (item.imageId.file.mimetype == "video/mp4") ? (
                      <Video loop muted
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        // poster="http://sourceposter.jpg"
                        onCanPlayThrough={() => {
                          {/* // Do stuff */ }
                        }}>
                        <source src={"http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + item.imageId._id} type="video/webm" />
                        {/* <track label="English" kind="subtitles" srcLang="en" crossorigin="" src={"http://mitapi.memeinfotech.com:5000/file/getImage?imageId="+item.imageId._id}  default /> */}
                      </Video>
                    ) : ''
                    : ''

                  }
                  {/* <img src={Wallpostimg} /> */}
                  <p contentEditable='false' dangerouslySetInnerHTML={{ __html: item.title }} ></p>
                  <p className="sub_content" contentEditable='false' dangerouslySetInnerHTML={{ __html: item.content }} ></p>
                </div>
                <div className="likecomment">
                  <h3>{item.like.length}  likes</h3>{
                    (item.like).indexOf(sessionStorage.getItem('userId')) > -1 ? <Button title="like"><Icon type="like-o" />Unlike</Button> : <Button title="like" className={((item.like).indexOf(sessionStorage.getItem('userId')) > -1) ? 'messagecomment' : ''} onClick={() => { this.postLike(item._id) }}><Icon type="like-o" />Like</Button>
                  }

                  <Button title="comment" onClick={() => { this.showCommentBox(item._id) }}><Icon type="message" />Comment ({item.comments.length})</Button>

                </div>
              </div>
              {/* ****Comment section**** */}
              <div className="commentSection">
                <Row type="flex" justify="space-around" align="middle">

                  <Col xs={3} sm={3} md={2}>
                    <div className="commentImg">
                      {
                        (this.state.userInfo.imageId || this.state.userInfo.providerPic) ? <img src={this.state.imageUrl} /> : <img src={User} />
                      }
                    </div>
                  </Col>

                  <Col xs={21} sm={21} md={22}>
                    <div className="commentText">
                      <img src={camera} />
                      <TextArea rows={1} ref="commentText" defaultValue={this.state.comments.comment} onChange={(e) => this.writeComment(item._id, e)} onKeyPress={this.postComment} />
                    </div>
                  </Col>

                </Row>


                <Row >
                  {item.comments.map((list) => (

                    this.state.showcomment && item._id === this.state.cPostid ?
                      // this.state.showcomment ?
                      <div className="contentsComment" key={list._id}>
                        <Col xs={3} sm={3} md={2}>
                          <div className="commentImg">
                            {
                              (list.userId.imageId) ? <img src={"http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + list.userId.imageId._id} /> : (list.userId.providerPic) ? <img src={list.userId.providerPic} /> : <img src={User} />
                            }
                          </div>
                        </Col>

                        <Col xs={21} sm={21} md={22}>
                          <div className="postComment">
                            <p>{list.userId.userName}</p>
                            <h3>{list.userId.designation}</h3>
                            <h3>{list.comment}</h3>
                            {/* <p className="likeReply">
      <Button className="commentbutton">Like</Button>
      <Button className="commentbutton4">Reply</Button>
      <span className="likeTotal">1 Like</span>
    </p> */}
                          </div>
                        </Col>
                      </div> : ''
                  ))
                  }
                </Row>
              </div>
              {/* ****Comment section**** */}
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

        {/* ----------MODAL SECTION FOR write something end------------- */}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default Wall;
