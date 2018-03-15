//importing modules
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
var app = express();
var http = require('http');

// put const here
const userRoute = require('./mitServer/user.controller');
const uploadRoute = require('./mitServer/upload/file.controller');
const postRoute = require('./mitServer/post/socialPost.controller');



//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/mitNetwork');
const server = http.createServer(app)
 var io = require('socket.io')(server)

 // socket connection
 io.sockets.on('connection', function(socket){
     console.log('Socket Connected'+ socket.id);
   //
     socket.on('comment',function(post){
         io.emit('comment',comment);
     });
 });
 //socet disconnected
 io.sockets.on('disconnected',function(socket){
 });

//on successful connection
mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb!!');
});

//on error
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in db is :' + err);
    }
});

//port no
const port = 5000;

//middleware
app.use(cors());
app.use(expressValidator());
// app.use (multer());
//body-parser
app.use(bodyParser.json());

//routes
app.use('/user', userRoute);
app.use('/file', uploadRoute);
app.use('/post', postRoute);



// port listen at
app.listen(port, () => {
    console.log('server started at port number :' + port);
});
