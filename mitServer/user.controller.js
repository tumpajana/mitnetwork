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
        name: request.body.name,
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

/* this is the login API for user 
using provider as user credential 
In respect of email and password user may logged in

*/
router.post('/login', (request, response) => {
    console.log("user login ");
    console.log(request.body);
    let email = (request.body.email).toLowerCase();
    let password = cryptr.encrypt(request.body.password);
    // let phoneNumber=request.body.phoneNumber;
    // let userName=request.body.userName
    let userLoginResponse = {};
    // { $or: [{ createdBy: request.query.userId }, { "member.userId": request.query.userId }] }
    user.findOne({ email: email, password: password }, (error, result) => {
        console.log(error);
        console.log(result);
        if (error || result === null) {
            userLoginResponse.error = true;
            userLoginResponse.message = "User does not exist";
            response.status(200).json(userLoginResponse);
        }
        else {

            userLoginResponse.error = false;
            userLoginResponse.user = result;
            userLoginResponse.message = `User login successfully .`;
            response.status(200).json(userLoginResponse);
        }

    });
});

//Api for get all list of Registration
router.get('/details', (request, response) => {
    console.log("user details");

    let getResponse = {};

    user.find({}, (error, result) => {
        if (error) {
            getResponse.error = true;
            getResponse.message = `Error :` + error.message;
            response.status(500).json(getResponse);
        } else {
            getResponse.error = false;
            getResponse.result = result;
            getResponse.message = `User details getting  successfully .`;
            response.status(200).json(getResponse);

        }
    });

});

/*Api to Get Single register User Details
*/
router.get('/getSingle', (request, response) => {
    console.log(" single user detail");
    let userId = request.query.userId;

    let getResponse = {};

    user.findOne({ _id: userId }, (error, result) => {
        if (error) {
            getResponse.error = true;
            getResponse.message = `Error :` + error.message;
            response.status(500).json(getResponse);
        } else {
            getResponse.error = false;
            getResponse.result = result;
            getResponse.message = ` Single User detail getting  successfully .`;
            response.status(200).json(getResponse);

        }
    });

});
/* Update(edit) the  Register User Fields through their Id 
*/
router.put('/update', (request, response) => {

    let _id = request.body._id;

    let userUpdateResponse = {};

    user.findById({ _id: _id }, (error, result) => {
        console.log(request.body);
        if (error) {
            userUpdateResponse.error = true;
            userUpdateResponse.message = `Error :` + error.message;
            response.status(500).json(userUpdateResponse);
        }
        else if (result) {
            console.log(result);
            result.name = (request.body.name ? (request.body.name) : result.name);
            result.phoneNumber = (request.body.phoneNumber ? (request.body.phoneNumber) : result.phoneNumber);

            result.userName = (request.body.userName ? (request.body.userName) : result.userName);

            if (request.body.email) {
                result.email = (request.body.email ? (request.body.email).toLowerCase() : result.email)
            };
            if (request.body.password) {
                result.password = (request.body.password ? cryptr.encrypt(request.body.password) : result.password)
            };
            result.save((error, result) => {
                if (error || result === null) {
                    userUpdateResponse.error = true;
                    userUpdateResponse.message = `Error :` + error.message;
                    response.status(500).json(userUpdateResponse);
                }
                else {
                    userUpdateResponse.error = false;
                    userUpdateResponse.user = result;
                    userUpdateResponse.message = `User Updated successfully.`;
                    response.status(200).json(userUpdateResponse);
                }

            });
        }
    });
});
//Api to Delete User 
router.delete('/delete', (request, response) => {
    console.log("delete user details");

    let deleteResponse = {};
    let userId = request.query.userId;
    user.remove({ _id: userId }, (error, result) => {
        if (error) {
            deleteResponse.error = true;
            deleteResponse.message = `Error :` + error.message;
            response.status(500).json(getResponse);
        } else {
            deleteResponse.error = false;
            deleteResponse.result = result;
            deleteResponse.message = `User detail deleted  successfully .`;
            response.status(200).json(deleteResponse);

        }
    });

});


module.exports = router;