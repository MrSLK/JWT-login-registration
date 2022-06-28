const db = require("../models");
const User = db.user;
const jwt = require('jsonwebtoken');

//Check if email exist
checkDuplicateEmail = (req, res, next) => {

      // Email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }
    
        next();
      });
};

//Check permissions
checkUser = (req, res, next) => {
  
    // User
  User.findOne({_id: req.body.user_id}).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(400).send({ message: "Failed! User not found!" });
      return;
    }

    next();
  });
};

// Check if user exist when loggin in
validateUsers = (req, res, next) => {
    User.findOne({email: req.body.email}).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (!user) {
            res.status(400).send({ message: "Failed! User doesn't exist!" });
            return;
          } 
          next();
    })
};

//Verify token
verifyToken = (req, res, next) => {
  var token = req.body.token;
  console.log(token);
  jwt.verify(token, 'w', function(err, decoded){
    if(!err){
      console.log(decoded);
      req.body.user_id = decoded.id;
      next();
    } else {
      res.send(err);
    }
  })
}

const authentication = {

  checkDuplicateEmail,
  checkUser,
  validateUsers,
  verifyToken
};

module.exports = authentication