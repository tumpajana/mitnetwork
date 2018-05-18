//importing modules
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');
var app = express();
var http = require('http');
var server = http.Server(app);
var server1 = require('http').createServer();
var io = require('socket.io')(server);
server1.listen(8888);



//middleware
app.use(cors());
app.use(expressValidator());
// app.use (multer());
//body-parser
app.use(bodyParser.json());



const userRoute = require('./mitServer/user.controller');
const uploadRoute = require('./mitServer/upload/file.controller');
const postRoute = require('./mitServer/post/socialPost.controller')(io);



//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/mitNetwork');

 // socket connection
 io.on('connection', function(socket){
     console.log('Socket Connected'+ socket.id);
   //
 });

//  io.use((socket)=>{
//     console.log("using "+socket.id)
//  })
 //socet disconnected

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



//routes
app.use('/user', userRoute);
app.use('/file', uploadRoute);
app.use('/post', postRoute);



// port listen at
server.listen(port, () => {
    console.log('server started at port number :' + port);
});
