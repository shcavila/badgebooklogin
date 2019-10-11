const express = require('express');
const loginRoute = express.Router();
const Test = require('../models/test')

loginRoute.route('/login').post(function (req, res) {
    console.log('hello')
    Test.findOne({
        email: req.username
    })
        .then(doc => {
            bcrypt.compare(testPass, doc.password)
                .then(match => {

                    if (match) {
                        console.log("correct")
                        res.send()
                        // Passwords match
                    } else {
                        console.log('wrong password')
                        res.status(404).json()
                    }
                })
                .catch(err => {
                    if (err) {
                        console.log(err)
                        res.json(err)
                    }
                })



        })
    // console.log(req.body.accountinfo)
    // console.log(req.body)
    // if ("rivas" == req.body.username && req.body.password == "123") {
    //     res.status(200).end("login successful")
    // } else {
    //     res.status(200).end("invalid credential")
    // }
})

module.exports = loginRoute