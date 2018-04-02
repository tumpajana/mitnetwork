'use strict'
const socialPost = require('./mitServer/post/socialPost.controller');
const user = require('./mitServer/user.controller');

var objectId = require('mongodb').ObjectID;

class Helper {
    getUserInfo(userId, callback) {
        user.findOne({ _id: userId }, (err, result) => {
            callback(err, result);
        });
    }
    /* 
	* To get User information with the id
	*/
	getUserInfoFromSocketId(socketId, callback) {
		user.findOne({ socketId: socketId }, (err, result) => {
			if (!err && result) {
				result.socketId = '';
				result.save().then((err, res) => {
					callback(err, res);
				})
			}
		});
	}
}
module.exports = new Helper();                                              
