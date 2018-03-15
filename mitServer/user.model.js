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
        sparse:true
    },
    email: {
        type: String,
        unique: true,
        sparse:true
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
    qualification:{
        type:String
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    designation:{
        type:String
    },
    imageId:{
        type:Schema.ObjectId,
        ref: 'image'
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
userSchema.pre('findOne', function (next) {
    this.populate('imageId');
    next();
});
userSchema.pre('find', function (next) {
    this.populate('imageId');
    next();
});
const user = module.exports = mongoose.model('user', userSchema);