const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const imageSchema = mongoose.Schema({

file:{
    type : Object
},
thumbnail:{
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

const image = module.exports = mongoose.model('image', imageSchema);