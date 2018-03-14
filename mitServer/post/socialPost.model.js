const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const postSchema = mongoose.Schema({

    comments:[{
        comment:{
            type:String
        },
        userId:{
            type:Schema.ObjectId,
            ref: 'user'
        }
    }]
    
    ,
    title:{
         type:String
    },
    content:{
        type:String
    },
    userId:{
        type:Schema.ObjectId,
         ref: 'user'
        },
    imageId:{
        type:Schema.ObjectId,
        ref: 'image'
        },
    postId:{
            type:String
        },
    like:[{
        type:Schema.ObjectId
    }],
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
    postSchema.pre('findOne', function (next) {
        this.populate('userId');
        next();
    });
    postSchema.pre('find', function (next) {
        this.populate('userId');
        next();
    });
    
    postSchema.pre('findOne', function (next) {
        this.populate('imageId');
        next();
    });
    postSchema.pre('find', function (next) {
        this.populate('imageId');
        next();
    });

    postSchema.pre('findOneAndUpdate', function (next) {
        this.populate('userId');
        next();
    });
   
    const post = module.exports = mongoose.model('post', postSchema);