const express = require('express');
const orgRoute = express.Router();
const Org = require('../models/Org');
const bcrypt = require('bcryptjs');
const config = require('./config');
const jwt = require('jsonwebtoken');

var data;



orgRoute.route("/login").post(function (req, res) {
   
    Org.findOne({
            username: req.body.username
        })
        .then(doc => {

            if (doc) {
                console.log(doc)
                bcrypt.compare(req.body.password, doc.password)
                    .then(match => {

                        if (match) {
                            console.log("correct")
                            // res.status(200).json({
                            //     message: "login successful"
                            // })
                            var token = jwt.sign({
                                id: doc._id,

                            }, config.secret, {
                                expiresIn: 86400 // expires in 24 hours
                            });
                            res.status(200).send({
                                auth: true,
                                token: token,
                                message: "login successful"
                            });
                            //console.log("this is the " + token);
                            //res.session.token = token ;
                            // Passwords match
                        } else {
                            console.log('wrong password');
                            res.status(200).json({
                                message: "Wrong password"
                            });
                        }
                    })
                    .catch(err => {
                        if (err) {
                            console.log(err);
                            res.status(200).json({
                                message: err.message
                            });
                        }
                    });
            }   
        }) 
        .catch(err =>{
            if (err) {
                console.log(err);
                res.status(200).json({
                    message: err.message
                });
            }
        })

});
orgRoute.route("/checkusername").post((req, res) => {
    console.log("helo there");
    Org.findOne({
            username: req.body.username
        })
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: "username already exist"
                });
                //console.log(doc)
            }
            if (!doc) {
                res.status(200).json({
                    message: "ok"
                });
            }

        })
        .catch(err => {
            if (err) {
                res.status(200).json({
                    message: err.name
                });
            }
        });

});


orgRoute.route("/signup").post((req, res) => {
    console.log(req.body);
     data = {
        username : req.body.username,
        password :  req.body.password,

    };
    res.status(200).send();
   
});

orgRoute.route('/signedup').post((req, res) => {
    console.log(data)
    if (data == undefined) {
        res.json({
            message: "error"
        });
    } else {
        res.json(data).send();
        //console.log('this is the data')
    }
})

orgRoute.route('/fullsignup').post((req, res) => {
    console.log(req.body);
    let org = new Org(req.body);
    user.save()
        .then(() => {
            console.log('saved');
            console.log("id" + user._id);
            data = req.body;
            var token = jwt.sign({
                username: user.username,
                password: user.password
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({
                auth: true,
                token: token
                //user : 
            });
            console.log("this is the " + token)
            // res.status(200).json({
            //     message: "Sign up successfully"
            // })

        })
        .catch(err => {
            if (err) {
                res.status(200).json({
                    message: err.message
                });
                //console.log(err)
            }

        }); 
});



module.exports = orgRoute;