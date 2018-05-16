

var express = require('express');
var path = require('path');
var router = express.Router();
var post = require('./socialPost.model');
// var helper =require('./../../helper');
// var ObjectId = require("mongodb").ObjectId;


//  Api for post
var returnRouter = function (io) {

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
                console.log('Post Uploded Succesfully')    //for socket
                io.emit('postUploded', result);

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

        let perPageResponse = {};

        post.find({}).populate('comments.userId').sort({ createdDate: 'descending' })
            .limit(perPage)
            .skip(perPage * page)
            .exec((error, result) => {
                if (error) {
                    perPageResponse.error = true;
                    perPageResponse.message = `Error :` + error.message;
                    perPageResponse.status(500).json(perPageResponse);
                } else {
                    post.count({}, function (error, c) {
                        console.log('Count is ' + c);
                        perPageResponse.error = false;
                        perPageResponse.total = c;
                        perPageResponse.result = result;
                        perPageResponse.message = ` projects for this page .`;
                        response.status(200).json(perPageResponse);

                    });
                }
            });
    });
    // Api for get particular  Social post

    //Api to get single post  through postId
    router.get('/getSinglePost', (request, response) => {
        console.log(" post detail through post id ");
        let postId = request.query.postId;

        let getResponse = {};

        post.findOne({ _id: postId }).populate('comments.userId').exec(function (error, result) {
            if (error) {
                getResponse.error = true;
                getResponse.message = `Error :` + error.message;
                response.status(500).json(getResponse);
            } else {
                getResponse.error = false;
                getResponse.result = result;
                getResponse.message = `  all comment  getting through post id successfully .`;
                response.status(200).json(getResponse);
            }
        });
    });
    //  Api for comment
    router.put('/comment', (request, response) => {
        let commentesponse = {};

        let userId = request.body.userId;
        let comment = request.body.comment;
        console.log(userId);
        post.findOneAndUpdate({ _id: request.body.postId }, { $push: { comments: { comment: comment, userId: userId } } }).populate('comments.userId').exec(function (error, result) {
            if (error) {
                commentesponse.error = true;
                commentesponse.message = `Error :` + error.message;
                commentesponse.status(500).json(commentesponse);
            } else {
                console.log('Comment Uploded Succesfully')    //for socket
                io.emit('comment', result);
                commentesponse.error = false;
                commentesponse.result = result;
                commentesponse.message = `Success`;
                response.status(200).json(commentesponse);
            }
            // io.to(socket.id).emit("comment", data)
        });
    });
    // Api for getting all  comment through postId
    router.get('/getCommentByPostId', (request, response) => {
        console.log(request.body);
        // var perPage = 5, page = request.param('page') > 0 ? request.param('page') : 0;
        let getResponse = {};
        let postId = request.query.postId;
        post.findOne({ _id: postId }).populate('comments.userId').exec(function (error, result) {
            // .sort({ createdDate: 'descending' })
            // .limit({comments:'perPage'})
            // .skip(perPage * page)
            console.log('error......', error);
            console.log('result.....', result);
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
        let likeResponse = {};

        let userId = request.body.userId;
        console.log(request.body);
        post.findOneAndUpdate({ _id: request.body.postId }, { $push: { like: userId } }, (error, result) => {
            if (error) {
                likeResponse.error = true;
                likeResponse.message = `Error :` + error.message;
                response.status(500).json(likeResponse);
            } else {
                likeResponse.error = false;
                likeResponse.result = result;
                likeResponse.message = `Success`;
                response.status(200).json(likeResponse);
            }
        });
    });
    // Api for Unlike
    // router.put('/unlike', (request, response) => {
    //     let likeResponse = {};

    //     let userId = request.body.userId;
    //     console.log(request.body);
    //     post.findOne({
    //         postId: request.body.postId,
    //         "like": {
    //             "$elemMatch": { "like": request.query.userId }
    //         }
    //     }),
    //         post.findOneAndUpdate({ _id: request.body.postId }, { $pull: { like: userId } }, (error, result) => {
    //             if (error) {
    //                 likeResponse.error = true;
    //                 likeResponse.message = `Error :` + error.message;
    //                 response.status(500).json(likeResponse);
    //             } else {
    //                 likeResponse.error = false;
    //                 likeResponse.result = result;
    //                 likeResponse.message = `Success`;
    //                 response.status(200).json(likeResponse);
    //             }
    //         });
    // });



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
    return router;
}
module.exports = returnRouter;