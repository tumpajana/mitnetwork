
import React, { Component } from 'react';
import Avatar, { Upload, Row, Col, Input, Icon, Radio, Button, Modal, Select, notification, Spin } from 'antd';
import Header from '../Header/Header.js';
import 'antd/dist/antd.css';
import './Wall.css';
import Gallery from 'react-grid-gallery';
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
import clapbutton from '../../Images/clap.svg';
import 'react-html5video/dist/styles.css';
import { isPrimitive } from 'util';
import Waypoint from 'react-waypoint';
import ImageLoader from '../Image/Image';
import Data_Store from './../../redux';
import getUserInfo from '../../Services/getUserInfo';
// import io from 'socket.io-client';
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

// const socket = io('http://mitapi.memeinfotech.com:5000');

const { TextArea } = Input;

class Wall extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      loading: false,
      visible: false,
      showPreviewIcon: true,
      showcomment: false,
      spinner: false,
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
      files: [],
      imageUploadList: [],
      videoUploadList: [],
      count: 0,
      pageNumber: 0,
      totalPost: 0,
      totalPostList: [],
      iconLoading: false,
      // enablePost: false,
      message: '',
      avatar: sessionStorage.getItem("avatar")
    }

    this.postContent = this.postContent.bind(this);
    this.postTitle = this.postTitle.bind(this);
    this.socialPost = this.socialPost.bind(this);
    this.postLike = this.postLike.bind(this);
    this.imageUpload = this.imageUpload.bind(this);
    this.writeComment = this.writeComment.bind(this);
    this.showCommentBox = this.showCommentBox.bind(this);
    this.videoUpload = this.videoUpload.bind(this);



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

    // subscribe to store for profile data
    Data_Store.subscribe(() => {
      console.log(Data_Store.getState());
      let result = Data_Store.getState();
      _base.renderUser(result);
    })

    // socket.on('getUserInfo', function (postData) {
    //   console.log(postData);
    // });

  }

  renderUser = (result) => {
    this.setState({ userInfo: result });
    this.setState({ avatar: sessionStorage.getItem("avatar") });
  }


  //postdata on server
  socialPost() {
    this.setState({ iconLoading: true });
    console.log('post')
    this.setState({ fileUploadList: [] });
    if ((this.state.posts.content)) {
      if (this.state.files.length != 0) {
        let _base = this;
        this.uploadFiles();
      }
      else {
        var dataSent = {
          title: this.state.posts.title,
          content: this.state.posts.content,
          userId: sessionStorage.getItem('userId'),
        }
        // this.enterLoading();
        this.createPost(dataSent);
      }
    }
    else {
      this.openNotificationWithIcon('warning', " No content for this post!");
    }
  }

  // actual api call wrapper to create a post of any type
  createPost = (postData) => {
    this.setState({ show: true });
    WallPost(postData).then((result) => {
      
      console.log(result);
      let _base=this
      setTimeout(function(){
         _base.setState({ show: false });
        _base.openNotificationWithIcon('success', " Post Uploaded Successfuly!");
      },2000);
      _base.setState({ fileNew: [] })
      _base.setState({
        posts: {
          title: "",
          content: ""
        }
      })
      _base.setState({ iconLoading: false });
      _base.refs.quill_content.setEditorContents(this.refs.quill_content.getEditor(), "");
      _base.setState({ imageId: [] })
      _base.setState({ showPreviewIcon: false })
      _base.setState({ imageUploadList: [] });
      _base.setState({ videoUploadList: [] });
      // this.getPosts();
    })
  }

  //get all post
  getPosts(pageNumber) {

    WallGet(pageNumber).then((result) => {
      // debugger;
      // console.log(result);
      if (result.result.length != 0) {     
        let posts = this.state.postList;
        this.setState({ postList: posts.concat(result.result.filter((element) => { return (element.userId != null || element.userId != undefined) })) });
        // this.setState({ totalPost: result.total });
        // result.result.forEach(element => {
        //   let x = result.result.filter((element) => { return (element.userId != null || element.userId != undefined) })
        //   this.state.totalPostList.push(element)
        // });
        // console.log('api callpost  list', this.state.totalPostList)
        // this.setState({ postList: this.state.totalPostList })
        // this.setState({ spinner: false })
        this.setState({message: ''})
      }
    else{
      this.setState({ spinner: false });
       this.setState({message:"No Post For Today"});
     }

    }, error => {
      this.setState({})
    });
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
    this.setState({
      posts: {
        title: '',
        content: this.refs.quill_content.getEditorContents()
      }
    })
  }

  //postlike
  postLike(id) {
    let likeData = {
      userId: sessionStorage.getItem("userId"),
      postId: id
    }

    postLike(likeData).then((result) => {
      let response = result;
    });
  }

  // upload image 
  imageUpload = (event) => {
    console.log(event)
    this.setState({
      files: []
    });
    this.setState({ imageUploadList: event.fileList });
    for (let i = 0; i < event.fileList.length; i++) {
      let fileList = event.fileList[i];
      let file = fileList.originFileObj;
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

    this.uploadFile();
  }


  uploadFile = () => {
    let _base = this;
    let file = _base.state.files[_base.state.count];
    var form = new FormData();
    form.append('file', file, file.name);
    profilePic(form).then((result) => {
      let id = result.upload._id;
      let ids = _base.state.imageId;
      ids.push(id);
      _base.setState({ imageId: ids });
      if (_base.state.count == _base.state.files.length - 1) {
        // post
        var dataSent = {
          title: _base.state.posts.title,
          content: _base.state.posts.content,
          userId: sessionStorage.getItem('userId'),
          imageId: _base.state.imageId
        }
        _base.createPost(dataSent);
      } else {
        this.setState({
          count: _base.state.count + 1
        });
        _base.uploadFile();
      }
    });
  }

  // get comments for a post
  getComments(id) {
    getPostComments(id).then((result) => {
      console.log(result);
      this.setState({ showcomment: true })
    })
  }


  // write comment in comment box
  writeComment(i, e) {
    this.setState({
      comments: {
        comment: e.target.value,
        postid: i
      }
    })
    // console.log(this.state.comments)
  }

  // post comment entered
  postComment = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.value = "";
      let data = {
        comment: this.state.comments.comment,
        postId: this.state.comments.postid,
        userId: sessionStorage.getItem('userId')
      }
      commentPost(data).then((result) => {
        if (result.error == false) {
          this.openNotificationWithIcon('success', "Commented on Post Successfuly!");
          // toast.success("Commented on Post Successfuly!", {
          //   position: toast.POSITION.TOP_CENTER,
          // });
          this.showCommentBox(result.result._id)
          this.getComments(result.result._id);
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

  // show comment box
  showCommentBox = (e) => {
    if (e == this.state.cPostid) {
      this.setState({ showcomment: !this.state.showcomment })
    }
    else {
      this.setState({ showcomment: true });
      this.state.cPostid = e;
    }
  }


  // upload video
  videoUpload = (event) => {
    console.log(event);
    this.setState({
      files: []
    });
    this.setState({ videoUploadList: event.fileList });
    for (let i = 0; i < event.fileList.length; i++) {
      let fileList = event.fileList[i];
      let file = fileList.originFileObj;
      let files = this.state.files;
      files.push(file);
      this.setState({
        files: files
      });
    }
  }





  // GET ALL OTHER POSTS
  getAllpost = () => {
    if (this.state.totalPostList.length == 0 || (this.state.totalPostList.length < this.state.totalPost)) {
      this.getPosts(this.state.pageNumber);
      this.setState({ spinner: true })
      let x = this.state.pageNumber;
      this.setState({ pageNumber: x + 1 });
      console.log(this.state.pageNumber);
    }
    //  
  }

  // ON MOVING TOP OF POSTS
  leavingBottom() {
    // let x = this.state.pageNumber;
    // this.setState({ pageNumber: x - 1 })
  }

  // notification show
  openNotificationWithIcon = (type, content) => {
    notification[type]({
      message: type,
      description: content,
      duration: 1,
    });
  };

  // onChangeValue = (e) => {
  //  this.setState({enablePost: true})
  // [e.target.name] = e.target.value;                        //updating value
  // }
  render() {
    const Option = Select.Option;
    const { visible, loading } = this.state;
    const { showcomment } = this.state;
    function handleChange(value) {
      // console.log(`selected ${value}`);
    }

    return (
      <div>
                     <Loading
          show={this.state.show}
            color=" orange"
            showSpinner={false}
        />
        {/* wall view section start */}
        <div className="postarticlesec">
          <div className="wallcard">
            <div className="usercard">
              <div className="postsec clearfix">
                <Row>
                  <div>
                    <Col span={3}>

                      <div className="userprflimg">
                        <ImageLoader src={this.state.avatar} />
                      </div>
                    </Col>
                    <Col span={21}>
                      <div className="usrview">
                        <h3>{this.state.userInfo.userName}</h3>
                        <p>{this.state.userInfo.designation}</p>
                      </div>

                    </Col>
                  </div>
                </Row>
              </div>
              <div className="textSection">
                <Row>
                  <Col span={24}>

                    <ReactQuill ref="quill_content" id="editor-content" className="textareheadng" placeholder="Write an article here" name="content" onChange={this.postContent} />

                  </Col>
                </Row>
              </div>
              <Row type="flex" justify="center">

                <Col span={24}>
                  <div placeholder="Write here .." className="showpostall" >
                  </div>

                </Col>
              </Row>


              <hr className="dividerwall" />
              <div className="uploadimgsec">
                <Row >

                  <div className="uploadalign">
                    <Col span={10}>
                      {/* ************************ UPLOAD SECTION FOR IMAGE****************** */}
                      <Upload className='upload-list-inline' onChange={this.imageUpload}
                        showUploadList={() => { this.state.showPreviewIcon } }
                        multiple={true} listType="picture" fileList={this.state.imageUploadList}
                        accept="image/*" >
                        <Button className="upldbtnwall">
                          <Icon type="upload" />Upload Image
                     </Button>
                      </Upload>
                      {/* ************************ UPLOAD SECTION FOR IMAGE ENDS****************** */}

                      {/* ************************ UPLOAD SECTION FOR VIDEO****************** */}
                      <Upload className='upload-list-inline' onChange={this.videoUpload}
                        showUploadList={() => { this.state.showPreviewIcon } }
                        multiple={false} listType="picture" fileList={this.state.videoUploadList}
                        accept='video/*'>
                        <Button className="upldbtnwall">
                          <Icon type="upload" />Upload Video
                      </Button>
                      </Upload>
                      {/* ************************ UPLOAD SECTION FOR VIDEO ENDS****************** */}

                    </Col>
                  </div>
                  <Col span={14}>

                    <Button className="post" title="Post" loading={this.state.iconLoading} onClick={this.socialPost}>Post</Button>
                  </Col>

                </Row>
              </div>
            </div>
          </div>
        </div>
        {/* wall view section end */}

        {/* posted blog html start */}
        <span>{this.state.message}</span>
        {this.state.postList.map((item, pIndex) => {
          return <div key={item._id}>
            <div className="postedpartcard">
              <div className="mitpic">
                <Row type="flex" justify="space-around" align="middle">
                  <Col md={{ span: 2 }} sm={{ span: 3 }} xs={{ span: 5 }}>
                    <div className="userpicpost">{
                      (item.userId.imageId) ? <ImageLoader src={"http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + item.userId.imageId._id} /> : (item.userId.providerPic) ? <ImageLoader src={item.userId.providerPic} /> : <ImageLoader src={User} />
                    }
                    </div>
                  </Col>
                  <Col md={{ span: 22 }} sm={{ span: 21 }} xs={{ span: 19 }}>
                    <p>{item.userId.userName}</p>
                    <h3>{item.userId.designation}</h3>
                  </Col>
                </Row>

                {/* Post Content area */}
                <PostContent item={item} index={pIndex}></PostContent>
                {/* Post content area ends */}


                <div className="likecomment">
                  <h3>{item.like.length}Claps</h3>{
                    (item.like).indexOf(sessionStorage.getItem('userId')) > -1 ?
                      <button title="like" type="button" className="ant-btn" >
                        <ImageLoader className="clapicon" src={clapbutton} />
                        <span>UnClap</span>
                      </button>
                      :
                      <button onClick={() => { this.postLike(item._id) } } title="like" type="button" className="ant-btn">
                        <ImageLoader className="clapicon" src={clapbutton} />
                        <span>Clap</span>
                      </button>
                  }

                  <button title="comment" type="button" className="ant-btn" onClick={() => { this.showCommentBox(item._id) } }><i className="anticon anticon-message"></i><span>Comment (</span> ({item.comments.length})<span>)</span></button>
                </div>


              </div>
              {/* ****Comment section**** */}
              <div className="commentSection">

                <Row type="flex" justify="space-around" align="middle">

                  <Col xs={5} sm={3} md={2}>
                    <div className="commentImg">
                      <ImageLoader src={this.state.avatar} />
                    </div>
                  </Col>

                  <Col xs={19} sm={21} md={22}>
                    <div className="commentText">
                      <ImageLoader src={camera} />
                      <TextArea rows={1} ref="commentText" defaultValue={this.state.comments.comment} onChange={(e) => this.writeComment(item._id, e)} onKeyPress={this.postComment} />
                    </div>
                  </Col>

                </Row>


                <Row >
                  {item.comments.map((list) => (

                    this.state.showcomment && item._id === this.state.cPostid ?
                      <div className="contentsComment" key={list._id}>
                        <Col xs={3} sm={3} md={2}>
                          <div className="commentImg">
                            {
                              (list.userId.imageId) ? <ImageLoader src={"http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + list.userId.imageId._id} /> : (list.userId.providerPic) ? <ImageLoader src={list.userId.providerPic} /> : <ImageLoader src={User} />
                            }
                          </div>
                        </Col>

                        <Col xs={21} sm={21} md={22}>
                          <div className="postComment">
                            <p>{list.userId.userName}</p>
                            <h3>{list.userId.designation}</h3>
                            <h3>{list.comment}</h3>
                          </div>
                        </Col>
                      </div>
                       : ''
                  ))
                  }
                </Row>
              </div>
              {/* ****Comment section**** */}
            </div>

          </div>


        })
        }
        <div>
          <Waypoint onEnter={() => { console.log('last end'); this.getAllpost(); } } onLeave={() => { console.log('Waypoint left') } } />

          <Icon type="loading" spinning={this.state.spinner} style={{ fontSize: 40 }} />
        </div>
      </div>
    );
  }
}

export default Wall;






/** to show posts **/


class PostContent extends Component {
  constructor(props) {
    super(props);
    console.log('post content0',props)
    this.state = {
      imgsrc:(this.props.item.imageId.length>0)?"" + this.props.item.imageId[0]._id + '&select=thumbnail':''
    }
  }

  // componentWillMount() {
  //   console.log('post comment component will mount')
  //  if(this.props.item.imageId.length>0){
  //   var primaryImage = new Image() ;// create an image object programmatically

  //   // console.log(primaryImage)
  //   primaryImage.onload=()=> { 
  //     this.setState({ imgsrc: 'http://mitapi.memeinfotech.com:5000/file/getImage?imageId=' + this.props.item.imageId[0]._id })
  //   }
  //   primaryImage.src = this.state.imgsrc // do it
  //  }
     
  // }
  
  
  render() {
    return (
      <div className="postedimg onlytext">
        {this.props.item.imageId.length > 0 ?
          ((this.props.item.imageId[0].file.mimetype).match("image/")) ?
            this.props.item.imageId.length == 1 ? <ImageTemplate src={this.props.item.imageId[0]._id}></ImageTemplate> :
              <CustomGallery src={this.props.item.imageId}></CustomGallery>
            : ((this.props.item.imageId[0].file.mimetype).match("video/")) ? (
              <VideoTemplate src={"http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + this.props.item.imageId[0]._id}></VideoTemplate>
            ) : ''
          : ''
        }

        <p contentEditable='false' dangerouslySetInnerHTML={{ __html: this.props.item.title }} ></p>
        {
          this.props.item.content.length > 800 ? <span><p className="sub_content" contentEditable='false' dangerouslySetInnerHTML={{ __html: this.props.item.content.substring(0, 800) }} ></p>
            <p onClick={() => {
            } }>...see more</p></span> : <p className="sub_content" contentEditable='false' dangerouslySetInnerHTML={{ __html: this.props.item.content }} ></p>
        }
      </div>
    );
  }
}


/** to show images / multiple images **/

class CustomGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.src.map((item) => {
        return {
          src: "http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + item._id,
          thumbnail: "http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + item._id,
          thumbnailWidth: 320,
          thumbnailHeight: 212
        }
      })
    }
    console.log(this.state.images);
  }
  render() {
    {
      return (
        <Row>
          <Col md={24} sm={24} xs={24}>
            <Gallery images={this.state.images} />
          </Col>
        </Row>
      )
    }
  }
}

/** to show video / single video **/

class VideoTemplate extends Component {
  constructor(props) {
    super(props);
  }

  playVideo = () => {
    this.refs.video.play();
  }

  pauseVideo = () => {
    let video = this.refs.video;
    let isPlaying = video.currentTime > 0 && !video.paused && !video.ended
      && video.readyState > 2;

    if (!isPlaying) {
      video.play();
    }
  }

  render() {
    return (
      <div>
        {/* ******** PLAY VIDEO WHEN IN VIEWPORT RANGE*********** */}
        <Waypoint onEnter={() => { console.log('entered'); this.playVideo() } } onLeave={() => { console.log('left'); this.pauseVideo() } } />
        <video className="videoWall" ref="video" controls muted>
          <source src={this.props.src} type="video/webm" />
        </video>
      </div>
    );
  }
}


/** to show single image **/
class ImageTemplate extends Component {
  constructor(props) {
    super(props);
    console.log('iagetemplateprops',props);
  
  }
  
  render() {
    return (<ImageLoader src={this.props.src} />);
  }
}


