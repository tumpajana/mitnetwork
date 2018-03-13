const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const imageSchema = mongoose.Schema({

file:{
    type : Object
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
imageSchema.pre('findOne', function (next) {
    this.populate('userId');
    next();
});
imageSchema.pre('find', function (next) {
    this.populate('userId');
    next();
});

const image = module.exports = mongoose.model('image', imageSchema);