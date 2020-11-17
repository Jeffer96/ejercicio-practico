const express = require('express');
const userRoute = express.Router();


// Get the user data template and structure
let User = require('../models/User');

//Add the route (action) of /addUser to add an User
userRoute.post('/addUser', function (reqst, resp, callback) {
    console.log("Add user -> Object: " + JSON.stringify(reqst.body));
    User.create(reqst.body.data, function (error, data) {
        if (error) {
            console.log("Error Adding User: " + error);
            return false;
            //return callback("Error Adding User: " + error);
        } else {
            console.log("Data persisted succesfully...");
            resp.json(data);
        }
    })
});

//Add the controller to Update function
userRoute.route('/updateUser/:id').put(function (reqst, resp, callback) {
    var idD = reqst.params.id;
    var bodyCon = reqst.body;
    var jsonObj = {
        id: idD,
        lastNames: bodyCon.lastNames,
        firstNames: bodyCon.firstNames,
        age: bodyCon.age,
        email: bodyCon.email,
        address: bodyCon.address,
        cellPhone: bodyCon.cellPhone,
        urlPhoto: bodyCon.urlPhoto
    }

    console.log("Updating: " + idD + " : " + JSON.stringify(jsonObj));

    User.findByIdAndUpdate(idD, jsonObj , function (error, data) {
        if (error) {
            console.log("Error updating User: "+error);
            return callback(error);            
        } else {
            console.log("Data updated succesfully...");
            resp.json(data);
        }
    })
});

//get All employees
userRoute.route('/').get(function (reqst, resp, callback) {
    User.find({},function (error, data) {
        if (error) {
            console.log("Error Getting All User: "+error);
            return callback(error);
        } else {
            console.log("Data recolected succesfully...");
            resp.json(data);
        }
    })
});

//Add the controller to get specified function
userRoute.route('/getUser/:id').get(function (reqst, resp, callback) {
    console.log("Id of user: " + reqst.params.id);
    User.find({ _id : reqst.params.id }, function (error, data) {
        if (error) {
            console.log("Error getting User: "+error);
            return callback(error);
        } else {
            console.log("Data recolected succesfully...");
            resp.json(data);
        }
    })
});

userRoute.route('/getUsersLikeName/:paramName').get(function (reqst, resp, callback) {
    User.find({ firstNames: /retst.params.paramName/ }, function (error, data) {
        if (error) {
            console.log("Errog Getting users with requested name");
            return false;
        } else {
            console.log("Data recolected succesfully...");
            resp.json(data);
        }
    })
});

//Add the controller to deleted specified user
userRoute.route('/delete/:id').delete(function (reqst, resp, callback) {
    User.findOneAndRemove(reqst.params.id, function (error, data) {
        if (error) {
            console.log(error);
            return callback(error);
        } else {
            console.log("Data recolected succesfully...");
            resp.json(data);
        }
    })
});

module.exports = userRoute;