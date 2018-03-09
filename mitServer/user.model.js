const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const userSchema = mongoose.Schema({

    userName: {
        type: String
    },
    name: {
        type: String
    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse:true,
        required:true
    },
    email: {
        type: String,
        unique: true,
        sparse:true,
        required:true
    },
    password: {
        type: String
    },
    providerName:{
        type:String
    },
    providerId:{
        type:String
    },
    providerPic:{
        type:String
    },
    token:{
        type:String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    enabled: {
        type: Number,
        default: 1
    }
});
const user = module.exports = mongoose.model('user', userSchema);