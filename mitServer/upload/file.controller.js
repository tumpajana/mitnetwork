// var express = require('express');
// var multer = require('multer');
// var upload = multer({ dest: 'imageUploads/' });
// var path = require('path');
// var fs = require('fs');
// var router = express.Router();
// var file = require('./image.model');

// //storage for files
// var storage = multer.diskStorage({
//     destination: function (request, file, cb) {
//         cb(null, './imageUploads')
//     },
//     filename: function (request, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// });
// Api for Image Upload

// router.post('/upload', (request, response) => {
//     var image;
//     console.log("file upload");
//     console.log(file);

//     let imageResponse = {};

//     var upload = multer({
//         storage: storage,
//         fileFilter: function (request, file, cb) {
//             var ext = path.extname(file.originalname);
//             cb(null, true)
//         }
//     }).single('file');

//     upload(request, response, function (error) {

//         if (error) {
            // throw error;
//             imageResponse.error = true;
//             imageResponse.message = `Error :` + error.message;
//             response.status(500).json(imageResponse);
//         }
//         else if (request.file) {
//             // console.log(request);
//             image = request.file;

//             let data = new file({
//                 file: image
//             });

//             data.save((error, result) => {
//                 if (error) {
//                     imageResponse.error = true;
//                     imageResponse.message = `Error :` + error.message;
//                     response.status(500).json(imageResponse);
//                 }
//                 else if (result) {
//                     imageResponse.error = false;
//                     imageResponse.upload = result;
//                     imageResponse.message = `file upload successful.`;
//                     response.status(200).json(imageResponse);
//                 }
//                 else {
//                     imageResponse.error = true;
//                     imageResponse.message = `file upload unsuccessful.`;
//                     response.status(500).json(imageResponse);
//                 }
//             });
//         }
//     });
// });

/* Api for get Image through their Id
*/
// router.get('/getImage', (request, response) => {
//     let imageResponse = {};
//     console.log("image display");
//     console.log(request.query);
//     file.findById(request.query.imageId, (error, result) => {
//         if (error) {
//             imageResponse.error = true;
//             imageResponse.message = `Server error : ` + error.message;
//             response.status(500).json(imageResponse);
//         }
//         else if (result) {
//             response.set({
//                 "Content-Disposition": 'attachment; filename="' + result.file.originalname + '"',
//                 "Content-Type": result.file.mimetype
//             });
//             fs.createReadStream(result.file.path).pipe(response);
//         }
//         else {
//             imageResponse.error = true;
//             imageResponse.message = `No such image available`;
//             response.status(500).json(imageResponse);
//         }
//     })
// });
module.exports = router;