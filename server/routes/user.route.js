// const express = require("express");
// const userRoute = express.Router();
// const User = require("../models/User")
// const bcrypt = require("bcryptjs")
// const config = require("./config")
// const jwt = require("jsonwebtoken")

// var data;



// userRoute.route("/login").post(function (req, res) {
//     var token = req.headers["authorization"];
//     console.log(token)

//     User.findOne({
//             username: req.body.username
//         })
//         .then(doc => {

//             if (doc) {
//                 console.log(doc)
//                 bcrypt.compare(req.body.password, doc.password)
//                     .then(match => {

//                         if (match) {
//                             console.log("correct")
//                             // res.status(200).json({
//                             //     message: "login successful"
//                             // })
//                             var token = jwt.sign({
//                                 id: doc._id,
                               
//                             }, config.secret, {
//                                 expiresIn: 86400 // expires in 24 hours
//                             });
//                             res.status(200).send({
//                                 auth: true,
//                                 token: token,
//                                 message: "login successful"
//                             });
//                             console.log("this is the "+ token)
//                             //res.session.token = token ;
//                             // Passwords match
//                         } else {
//                             console.log("wrong password")
//                             res.status(200).json({
//                                 message: "Wrong password"
//                             })
//                         }
//                     })
//                     .catch(err => {
//                         if (err) {
//                             console.log(err)
//                             res.json(err)
//                         }
//                     })

//             }

//         })

// })
// userRoute.route("/checkusername").post((req, res) => {
//     console.log(req.body)
//     User.findOne({
//             username: req.body.username
//         })
//         .then(doc => {
//             console.log(doc)
//             if (doc) {
//                 res.status(200).json({
//                     message: "username already exist"
//                 })
//                 //console.log(doc)
//             }
//             if (!doc) {
//                 console.log("errorjud")
//                 res.status(200).json({message: "ok"})
//             }

//         })
//         .catch(err => {
//             console.log(err)
//             if (err) {
                
//                 res.status(200).json({
        
//                     message: err.name
//                 })
//             }
//         })
        

// })


// userRoute.route("/signup").post((req, res) => {
    
//     let user = new User(req.body)
//     user.save()
//         .then(() => {
//             console.log("saved")
//             console.log("id"+ user._id)
//             data = req.body
//             var token = jwt.sign({
//                 username: user.username,
//                 password: user.password
//             }, config.secret, {
//                 expiresIn: 86400 // expires in 24 hours
//             });
//             res.status(200).send({
//                 auth: true,
//                 token: token
//                 //user : 
//             });
//             console.log("this is the "+ token)
//             // res.status(200).json({
//             //     message: "Sign up successfully"
//             // })

//         })
//         .catch(err => {
//             if (err) {
//                 res.status(200).json({
//                     message: "Unexpected error occured"
//                 })
//             }

//         })
// })

// userRoute.route("/signedup").post((req,res) => {
//     res.json(data).send()
// })

// userRoute.route("/fullsignup").post((req,res) =>{
//     console.log("hello")
//     console.log(req.body)
// });


// // let doc = await Character.findOneAndUpdate(filter, update, {
// //   new: true
// // });
// userRoute.route('/update-regular/:username').post((req,res) => {
//     let filter = req.params.username;
//     console.log("hello")
//     console.log(filter)
//     //User.findOneAndUpdate()
// })



// module.exports = userRoute