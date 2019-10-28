const express = require("express");
const userRoute = express.Router();
const User = require("../models/regUser")
const Organization = require("../models/organization")
const bcrypt = require("bcryptjs")
const config = require("./config")
const jwt = require("jsonwebtoken")

var data;

var accounts = [];

function findUser(username) {
  return new Promise(function (resolve, reject) {
    console.log("FINDING IN THE USER COLLECTION")
    User.findOne({
      username: username
    })
      .then(doc => {
        if (doc) {
          console.log("THE USER INFO: " + doc)
          resolve(doc);
        } else {
          resolve("not found")
        }
      }).catch(err => {
        resolve("error");
        console.log(err)
      })
  })
}

async function findOrg(username) {
  var status = await findUser(username);
  return new Promise(function (resolve, reject) {
    console.log("result from user: " + status);
    if (status == "not found") {
      console.log("FINDING IN ORGANIZATION COLLECTION");
      Organization.findOne({
        username: username
      })
        .then(doc => {
          if (doc) {
            console.log("THE ORGANIZATION INFO: " + doc);
            resolve({ data: doc });
          } else {
            resolve({ data: "not found" });
          }
        }).catch(err => {
          resolve({ data: err.message });
          console.log(err);
        })
    } else {
      resolve({ data: status });
    }
  })
}

userRoute.route("/login").post(function (req, res) {
  console.log("LOGIN USER: " + req.body)
  getResult();

  async function getResult() {
    var fuser = await findOrg(req.body.username);
    console.log("result: " + fuser);
    console.log("finalizing request!")
    if (fuser.data != "not found") {
      bcrypt.compare(req.body.password, fuser.data.password)
        .then(match => {
          if (match) {
            console.log("correct")
            var token = jwt.sign({
              username: fuser.data.username,
              type: fuser.data.type,
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
            res.status(200).send({
              auth: true,
              token: token,
              type: fuser.data.type,
              message: "login successful"
            });
          } else {
            console.log("wrong password")
            res.status(401).json({
              message: "Wrong password"
            })
          }
        })
        .catch(err => {
          if (err) {
            console.log(err)
            res.status(500).json(err)
          }
        })
    } else if (fuser.data == "not found") {
      res.status(404).json({
        message: "user not found!"
      })
    } else {
      res.status(500).json({
        message: "Unexpected error occured!"
      })
    }
  }
})







var user = {
  username: "",
  password: ""
}
userRoute.route("/signup").post((req, res) => {
  data = req.body
  user = req.body;
  res.status(200).end()
});



userRoute.route("/signedup").get((req, res) => {
  user2 = data
  data = {}
  res.status(200).json(user2)
})

userRoute.route("/userType").post((req, res) => {
  console.log(req.body.credential)
  var user = jwt.decode(req.body.credential)
  console.log(user)
  var type = user.type //example the user type is "Regular user"
  res.status(200).json({
    userType: type
  })
})
var badges = [] //temporary storage for offered or posted badges


userRoute.route("/availbadge").post((req, res) => {
  console.log(req.body);
  var availed = false;
  for (var j = 0; j < accounts.length; ++j) {
    if (accounts[j].type == "Organization") {
      var bad = accounts[j].badges;
      for (var i = 0; i < bad.length; ++i) {
        if (bad[i].code == req.body.code) {
          availed = true;
          var user = jwt.decode(req.body.credentials);
          accounts[j].badges[i].recipient.push({
            username: user.username,
            Fullname: "Jonathan Rivas"
          });
          res.status(200).json({
            message: "successful"
          });
          break;
        }
      }
    }
  }
  if (!availed) {
    res.status(401).json({
      message: "incorrect code"
    })
  }
})

userRoute.route("/certify").post((req, res) => {
  console.log(req.body.badgeInfo)
  var org = jwt.decode(req.body.user)
  var success = false;
  for (var i = 0; i < accounts.length; ++i) {
    if (accounts[i].username == org.username) {
      console.log("floop")
      var bad = accounts[i].badges;
      for (var j = 0; j < bad.length; ++j) {
        console.log("2")
        if (bad[j].code == req.body.badgeInfo.code) {
          console.log("3")
          success = true;
          var badge = req.body.badgeInfo;
          accounts[i].badges[j].granted = true;
          accounts[i].badges[j].descriptions = badge.descriptions;
          accounts[i].badges[j].certificateName = badge.certificateName;
          console.log(accounts[i].badges[j].recipient)
        }
      }
    }
  }
  if (success) {
    res.status(200).json({
      message: "successful"
    });
  } else {
    res.status(500).json({
      message: "Something wrong happen!"
    });
  }
})

userRoute.route('/addrecipient').post((req, res) => {
  console.log(req.body)
  var f = false;
  for (var i = 0; i < accounts.length; ++i) {
    if (accounts[i].username == req.body.username) {
      console.log(req.body)
      f = true;
      var org = jwt.decode(req.body.org);
      console.log("this badges org request");
      console.log(org);
      var orgbadge = [];
      for (var h = 0; h < accounts.length; ++h) {
        if (accounts[h].username == org.username) {
          orgbadge = accounts[h].badges;
          for (var j = 0; j < orgbadge.length; ++j) {
            if (orgbadge[j].code == req.body.code) {
              accounts[h].badges[j].recipient.push({
                username: accounts[i].username,
                fullname: accounts[i].firstname + " " + accounts[i].lastname
              })

            }
          }
        }
      }

    }
  }
  if (f) {
    res.status(200).json({
      badges: orgbadge
    });
  } else {
    res.status(404).json({
      message: "User not found!"
    })
  }
})

userRoute.route("/userbadges").post((req, res) => {
  var user = jwt.decode(req.body.user);
  console.log(user)
  var badges = [];
  for (var i = 0; i < accounts.length; ++i) {
    if (accounts[i].type == "Organization") {
      var bad = accounts[i].badges;
      for (var j = 0; j < bad.length; ++j) {
        for (var h = 0; h < bad[j].recipient.length; ++h) {
          if (bad[j].recipient[h].username == user.username) {
            badges.push(bad[j]);
          }
        }
      }
    }
  }
  console.log("THIS IS THE USER BADGES")
  console.log(badges)
  res.status(200).json({
    badges: badges,
    fullname: "Jonathan Rivas",
  });

})



//REGULAR USER SIGN UP
userRoute.route("/fullsignup").post((req, res) => {
  getResult();

  async function getResult() {
    var result = await findOrg(req.body.username);
    console.log("RESULT FROM ORG COLLECTION: " + result);
    if (result.data == "not found") {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const user = new User(req.body)
      console.log(user)
      user.save()
        .then((data) => {
          var token = jwt.sign({
            username: user.username,
            type: user.type
          }, config.secret, {
              expiresIn: 86400
            });
          res.status(200).send({
            auth: true,
            token: token
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        })
    } else if (result.data == "error") {
      res.status(500).json({ message: "Unexpected error occured!" })
    } else {
      console.log("RESPOND 400 ALREADY TAKEN")
      res.status(400).json({ message: "Username is already taken!" })
    }
  }
})

userRoute.route('/update-regular/:username').post((req,res) => {
   let filter = {username: req.body.username};
   let update = req.body;
  User.findOneAndUpdate(filter,update,{new: true})
  .then(() =>{
    res.status(200).json({message: 'Update Successfull'});
  })
  .catch(err =>{
      if(err){
        console.log(err.message)
      }
  })
})



//ORGANIZATION SIGN UP
userRoute.route("/orgsignup").post((req, res) => {
  getResult();

  async function getResult() {
    var result = await findOrg(req.body.username);
    console.log("RESULT FROM ORG COLLECTION: " + result)
    if (result.data == "not found") {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const user = new Organization(req.body)
      console.log(user)
      user.save()
        .then((data) => {
          var token = jwt.sign({
            username: user.username,
            type: user.type
          }, config.secret, {
              expiresIn: 86400
            });
          res.status(200).send({
            auth: true,
            token: token
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send(err);
        })
    } else if (result.data == "error") {
      res.status(500).json({ message: "Unexpected error occured!" })
    } else {
      console.log("RESPOND 400 ALREADY TAKEN")
      res.status(400).json({ message: "Username is already taken!" })
    }
  }
})

//************************************************************************************************************** */
function orgInfo(username) {
  return new Promise(function (resolve, reject) {
    Organization.findOne({
      username: username
    }).then(doc => {
      if (doc) {
        resolve({ data: doc });
      }
    }).catch(err => {
      resolve({ data: "ERROR HAS OCCURED!" });
    })
  })
}



userRoute.route("/offerbadge").post((req, res) => {
  var org = jwt.decode(req.body.user);
  console.log(req.body.badge);
  Organization.updateOne({username: org.username}, {$push: {badges: req.body.badge}})
  .then(() => {
    console.log("UPDATE SUCCESSFUL");
    res.status(200).json({message: "successfull added"});
  }).catch(err => {
    res.status(500).json({message: "un error occured!"});
    console.log(err);
  })
})


userRoute.route("/badges-org").post((req, res) => {
  var user = jwt.decode(req.body.data);
  console.log(user);
  getOrgBadges();
  async function getOrgBadges() {
    var org = await orgInfo(user.username);
    console.log("ORG BADGES: "+org.data.badges);
    res.status(200).json({
      badges: org.data.badges
    })
  }
})


userRoute.route("/pendingbadges").post((req, res) => {
  // var org = jwt.decode(req.body.data);
  // var orgbadge = [];
  // for (var i = 0; i < accounts.length; ++i) {
  //   if (accounts[i].username == org.username) {
  //     console.log(accounts[i].badges)
  //     if (accounts[i].type = "Organization") {
  //       for (var j = 0; j < accounts[i].badges.length; ++j) {
  //         if (!accounts[i].badges[j].granted) {
  //           orgbadge.push(accounts[i].badges[j])
  //           res.status(200).json({message: "Successfully added!"})
  //         }
  //       }
  //     }
  //   }
  // }
  // console.log(orgbadge)
  // res.status(200).json({
  //   badges: orgbadge
  // });
})



userRoute.route("/validatecode").post((req, res) => {
  if (req.body.code != "badgecode") {
    console.log("NOT TAKEN!")
    res.status(200).json({
      message: "OK"
    })

  } else {
    console.log("TAKEN")
    res.status(400).json({
      message: "Code is taken, regenerate new!"
    });
  }
})


//========================================================================================================

userRoute.route("/userInfo").post((req, res) => {
  var user = jwt.decode(req.body.data);
  getResult();
  async function getResult() {
    var result = await findOrg(user.username);
    if (result.data != "not found" && result.data != "error") {
      res.status(200).json({ data: result.data });
    } else if (result.data == "error") {
      res.status(500).json({ message: "Unexpected error occured!" });
    }
  }
})


module.exports = userRoute;
