

var express = require('express');
var path = require('path');
var router = express.Router();
var post = require('./socialPost.model');
// var ObjectId = require("mongodb").ObjectId;


//  Api for post

router.post('/socialPost', (request, response) => {
    console.log("post upload ");
    console.log(request.body);

    let postResponse = {};
    let data = new post({
        title: request.body.title,
        content: request.body.content,
        userId: request.body.userId,
        imageId: request.body.imageId

    });

    console.log(data);
    data.save((error, result) => {
        if (error) {
            console.log(error);

            postResponse.error = true;
            postResponse.message = `Error :` + error.message;
            response.status(500).json(postResponse);
        } else {
            console.log(result);
            postResponse.error = false;
            postResponse.user = result;
            postResponse.message = ` Post  is uploded  successfully.`;
            response.status(200).json(postResponse);

        }

    });
});
// Api for get  all Social post

router.get('/getAllPost', (request, response, next) => {
    console.log(" post detail");
    var perPage = 10, page = request.param('page') > 0 ? request.param('page') : 0;

    let getResponse = {};

    post.find({}).sort({ createdDate: 'descending' })
        .limit(perPage)
        .skip(perPage * page)
        .exec((error, result) => {
            if (error) {
                getResponse.error = true;
                getResponse.message = `Error :` + error.message;
                response.status(500).json(getResponse);
            } else {
                getResponse.error = false;
                getResponse.result = result;
                getResponse.message = `  getting all  post  successfully .`;
                response.status(200).json(getResponse);
            }
        });
});
// Api for get particular  Social post

// router.get('/getPost', (request, response) => {
//     console.log(" single project detail");
//     let postId = request.query.postId;

//     let getResponse = {};

//     post.findOne({ _id: postId }, (error, result) => {
//         if (error) {
//             getResponse.error = true;
//             getResponse.message = `Error :` + error.message;
//             response.status(500).json(getResponse);
//         } else {
//             getResponse.error = false;
//             getResponse.result = result;
//             getResponse.message = `  post getting  successfully .`;
//             response.status(200).json(getResponse);
//         }
//     });
// }); 
//Api to All comment through userId
// router.get('/getAllByUserId', (request, response) => {
//     console.log(" project detail through clientId");
//     let clientId = request.query.clientId;

//     let getResponse = {};

//     post.find({ clientId: clientId }, (error, result) => {
//         if (error) {
//             getResponse.error = true;
//             getResponse.message = `Error :` + error.message;
//             response.status(500).json(getResponse);
//         } else {
//             getResponse.error = false;
//             getResponse.result = result;
//             getResponse.message = `  all comment  getting through userId successfully .`;
//             response.status(200).json(getResponse);
//         }
//     });
// });
// Api for comment
router.post('/comment', (request, response) => {
    console.log("comment upload ");
    console.log(request.body);

    let postResponse = {};
    let data = new post({
        comment: request.body.comment,
        userId: request.body.userId,
        postId: request.body.postId
    });
    console.log(data);
    data.save((error, result) => {
        if (error) {
            console.log(error);
            postResponse.error = true;
            postResponse.message = `getAllCommentError :` + error.message;
            response.status(500).json(postResponse);
        } else {
            console.log(result);
            postResponse.error = false;
            postResponse.user = result;
            postResponse.message = ` comment uploaded  successfully.`;
            response.status(200).json(postResponse);

        }

    });
});
// Api for getting all  comment through postId
router.get('/getAllComment', (request, response) => {
    var perPage = 10, page = request.param('page') > 0 ? request.param('page') : 0;
    let getResponse = {};
    let postId = request.query.postId;
    post.find({ postId: postId })
        .sort({ createdDate: 'descending' })
        .limit(perPage)
        .skip(perPage * page)
        .exec((error, result) => {
            if (error) {
                getResponse.error = true;
                getResponse.message = `Error :` + error.message;
                response.status(500).json(getResponse);
            } else {
                getResponse.error = false;
                getResponse.result = result;
                getResponse.message = ` getting all comment   successfully .`;
                response.status(200).json(getResponse);
            }
        });
});

// Api for likes
router.put('/like', (request, response) => {
    console.log("user create ");
    console.log(request.body);

    let socialResponse = {};

    let _id = request.body.userId;
    post.findOneAndUpdate({ _id: request.body.postId }, { $push: { like:  _id  } }, (error, result) => {
        if (error) {
            socialResponse.error = true;
            socialResponse.message = `Error :` + error.message;
            response.status(500).json(socialResponse);
        } else {
            socialResponse.error = false;
            socialResponse.result = result;
            socialResponse.message = ` Thanku for Liking.`;
            response.status(200).json(socialResponse);
        }
    });
});
router.put('/like', (request, response) => {
    let likeResponse = {};
    post.findOne({
        postId: request.body.postId,

        "like": {
            "$elemMatch": { "userId": request.body.userId }
        }
    },
        (error, result) => {
            console.log('/////error/////', error);
            console.log(result);

            if (error) {
                likeResponse.error = true;
                likeResponse.message = `Error :` + error.message;
                response.status(500).json(likeResponse);
            }
            else if (result == null) {
                let _id = request.body.userId;
                post.finUpdate({ _id: request.body.postId }, { $push: { like: { userId: _id } } }, (error, result) => {
                    if (error) {
                        likeResponse.error = true;
                        likeResponse.message = `Error :` + error.message;
                        response.status(500).json(likeResponse);
                    } else {
                        likeResponse.error = false;
                        likeResponse.result = result;
                        likeResponse.message = ` Thanku for Liking.`;
                        response.status(200).json(likeResponse);
                    }
                });
            }
            else {
                likeResponse.error = true;
                likeResponse.message = `You already liked it`;
                response.status(500).json(likeResponse);
            }
        });
});

//Api for Delete post
router.delete('/delete', (request, response) => {
    console.log("delete user details");

    let deleteResponse = {};
    let postId = request.query.postId;
    post.remove({ _id: postId }, (error, result) => {
        if (error) {
            deleteResponse.error = true;
            deleteResponse.message = `Error :` + error.message;
            response.status(500).json(getResponse);
        } else {
            deleteResponse.error = false;
            deleteResponse.result = result;
            deleteResponse.message = `Post  deleted  successfully .`;
            response.status(200).json(deleteResponse);

        }
    });

});
module.exports = router;