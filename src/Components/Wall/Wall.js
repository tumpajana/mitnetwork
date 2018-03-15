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


import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';



const { TextArea } = Input;
class Wall extends Component {
  state = {
    loading: false,
    visible: false,
    showPreviewIcon:true
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
      imageId:''
    }
    
    this.postContent = this.postContent.bind(this);
    this.postTitle = this.postTitle.bind(this);
    this.socialPost = this.socialPost.bind(this);
    this.postLike = this.postLike.bind(this);
    this.imageUpload = this.imageUpload.bind(this);
    this.writeComment = this.writeComment.bind(this);
    this.getPosts();

  }




  //postdata on server
  socialPost() {
    console.log('post')
   if((this.state.posts.title) && (this.state.posts.content)){
     if(this.state.imageId){
       var dataSent={
        title: this.state.posts.title,
        content: this.state.posts.content,
        userId: sessionStorage.getItem('userId'),
        imageId:this.state.imageId
       }
     }
     else{
      var dataSent = {
        title: this.state.posts.title,
        content: this.state.posts.content,
        userId: sessionStorage.getItem('userId'),
         }
     }
   
  WallPost(dataSent).then((result) => {               //api call for post
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
      this.setState({imageId:''})
      this.setState({showPreviewIcon:false})
      this.getPosts();

    })
  }
  else{
    toast.warn(" No content for this post!", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
  }

  //get all post
  getPosts() {
    WallGet().then((result) => {
      console.log(result);
      if (result.result.length != 0) {
        this.setState({ postList: result.result.filter((element) => { return (element.userId != null || element.userId != undefined) }) });
      }
    });
  }

  //post title 
  postTitle = (e) => {
    if(this.refs.quill_title.getEditorContents()){
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
        title: this.state.posts.title,
        content: this.refs.quill_content.getEditorContents()
      }
    })
  
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
    console.log(event);
    console.log(event.fileList)
    let fileList = event.fileList[0];
    // let fileTarget = fileList;
    let file = fileList.originFileObj;
    console.log("File information :", file);
    var form = new FormData();
    form.append('file', file, file.name);
    profilePic(form).then((result) => {
      console.log(result)
      this.setState({imageId:result.upload._id});
    })
  
  
  }

  // get comments for a post
  getComments(id) {
    getPostComments(id).then((result) => {
      console.log(result)
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
      console.log(this.state.comments)
      let data = {
        comment: this.state.comments.comment,
        postId: this.state.comments.postid,
        userId: sessionStorage.getItem('userId')
      }
      commentPost(data).then((result) => {
        console.log('comment', result);
        if (result.error == false) {
          toast.success("Post Liked Successfuly!", {
            position: toast.POSITION.TOP_CENTER,
          });
          this.getComments(result.user._id);
          this.setState({
            comments: {
              comment: '',
              postid: ''
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
      console.log("Quill Title data",this.refs.quill_title.getEditorContents());
      console.log("Quill Content data",this.refs.quill_content.getEditorContents());
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

                  {/* <div className="userprflimg">
                    <img src={usrimgwall} />
                  </div> */}
                </Col>
                <Col span={22}>
                  <div className="usrview">
                    <h4 className="usrnamewall" contentEditable='true' dangerouslySetInnerHTML={{ __html: this.state.posts.title }}></h4>
                    <p className="degignationwall" contentEditable='true' dangerouslySetInnerHTML={{ __html: this.state.posts.content }}></p>
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

                <Upload onChange={this.imageUpload }
                  showUploadList={this.state.showPreviewIcon}>
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
        {this.state.postList.map((item) => {
          return <div>
            <div className="postedpartcard" key={item._id}>
              <div className="mitpic">
                <Row type="flex" justify="space-around" align="middle">
                  <Col md={{ span: 2 }} sm={{ span: 3 }} xs={{ span: 3 }}>
                    <div className="userpicpost">{
                      (item.userId.imageId) ? <img src={"http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + item.userId.imageId._id} /> : <img src={User} />
                    }
                    </div>
                  </Col>
                  <Col md={{ span: 22 }} sm={{ span: 21 }} xs={{ span: 21 }}>
                    <p>{item.userId.userName}</p>
                    <h3>{item.userId.designation}</h3>
                  </Col>
                </Row>
                <div className="postedimg">
                  {/* <img src={Wallpostimg} /> */}
                  {/* <Video autoPlay loop muted
                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                    poster="http://sourceposter.jpg"
                    onCanPlayThrough={() => { */}
                      {/* // Do stuff */}
                    {/* }}>
                    <source src="https://www.youtube.com/embed/MdG4f5Y3ugk" type="video/webm" />
                    <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default />
                  </Video> */}
                  {item.imageId ?<img src={'http://mitapi.memeinfotech.com:5000/file/getImage?imageId='+item.imageId._id} />:''}
                <p contentEditable='true' dangerouslySetInnerHTML={{ __html: item.title }} ></p>
                <p className="sub_content" contentEditable='true' dangerouslySetInnerHTML={{ __html: item.content }} ></p>
                </div>
                <div className="likecomment">
                  <h3>{item.like.length}  likes</h3>{
                    (item.like).indexOf(sessionStorage.getItem('userId')) >-1? <Button title="like"><Icon type="dislike-o" />Unlike</Button>:<Button title="like" className={((item.like).indexOf(sessionStorage.getItem('userId')) > -1) ? 'messagecomment' : ''} onClick={() => { this.postLike(item._id) }}><Icon type="like-o" />Like</Button>
                  }
               
                  <Button title="comment"><Icon type="message" />Comment</Button>

                </div>
              </div>
              {/* ****Comment section**** */}
              <div className="commentSection">
                <Row type="flex" justify="space-around" align="middle">

                  <Col xs={3} sm={3} md={2}>
                    <div className="commentImg">
                      <img src={User} />
                    </div>
                  </Col>

                  <Col xs={21} sm={21} md={22}>
                    <div className="commentText">
                      <img src={camera} />
                      <TextArea rows={1} onChange={(e) => this.writeComment(item._id, e)} onKeyPress={this.postComment} />
                    </div>
                  </Col>

                </Row>


                <Row>
                  <div className="contentsComment">
                    <Col xs={3} sm={3} md={2}>
                      <div className="commentImg">
                        <img src={User} />
                      </div>
                    </Col>

                    <Col xs={21} sm={21} md={22}>
                      <div className="postComment">
                        <p>John Doe</p>
                        <h3>Manager-TATA Sky, Co-Founder- India Needs You, Global Shaper</h3>
                        <h3>Good to see this all Best wishes</h3>
                        <p className="likeReply">
                          <Button className="commentbutton">Like</Button>
                          <Button className="commentbutton4">Reply</Button>
                          <span className="likeTotal">1 Like</span>
                        </p>
                      </div>
                    </Col>
                  </div>
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


                    <ReactQuill ref="quill_title" id="editor-title" className="textareheadng" placeholder="Headline" name="title" onChange={this.postTitle} />
                    <ReactQuill ref="quill_content" id="editor-content" placeholder="Write here .." className="textareawall" name="content" onChange={this.postContent} />

                  </form>
                </Col>
              </Row>

            </form>
          </Modal>

        </div>
        {/* ----------MODAL SECTION FOR write something end------------- */}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default Wall;
