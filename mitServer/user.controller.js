/* importing modules
*/
const express = require('express');
const router = express.Router();
const user = require('./user.model');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');

    /*Api for User Registration 
fields:- userName,firstName,lastName,phoneNumber,email,password
*/
router.post('/registration', (request, response) => {
    console.log("user create ");
    console.log(request.body);

    let registrationResponse = {};

    let data = new user({
        userName: request.body.userName,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        phoneNumber: request.body.phoneNumber
       
    });
    if (request.body.email) {
        data.email = (request.body.email).toLowerCase();

    };
    if (request.body.password) {
        data.password = cryptr.encrypt(request.body.password)
    };
    console.log(data);
    data.save((error, result) => {
        if (error) {
            console.log(error);
            registrationResponse.error = true;
            registrationResponse.message = `Error :` + error.code == 11000 ? error.message : "phone number already exist";
            response.status(500).json(registrationResponse);
        } else {
            console.log(result);
            registrationResponse.error = false;
            registrationResponse.user = result;
            registrationResponse.message = `registration is  successfull.`;
            response.status(200).json(registrationResponse);

        }

    });

});
module.exports = router;