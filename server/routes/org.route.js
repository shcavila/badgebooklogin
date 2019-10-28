const express = require('express');
const Org = require('../models/Org');
const bcrypt = require('bcryptjs');
const config = require('./config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const orgRoute = express.Router();
var data;

const conn = require('../server/DB');

mongoose.Promise = global.Promise;

// var db = mongoose.connect(conn.DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(
//     () => {
//       console.log('Database is connected')
//     },
//     err => {
//       console.log('Can not connect to the database' + err)
//     }
//   );



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
    .catch(err => {
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
    username: req.body.username,
    password: req.body.password,

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

  }
})

orgRoute.route('/fullsignup').post((req, res) => {
  console.log(req.body);
  let org = new Org(req.body);
  org.save()
    .then(() => {
      data = req.body;
      var token = jwt.sign({
        username: org.username,
        password: org.password
      }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({
        auth: true,
        token: token

      });
      console.log("Saved")
      
    })
    .catch(err => {
      if (err) {
        res.status(200).json({
          message: err.message
        });
        console.log(err);
      }

    });
});



module.exports = orgRoute;
