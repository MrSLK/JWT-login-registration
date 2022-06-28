const db = require("../models");
var bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = db.user;

const generateToken = (payload) => {
    return jwt.sign({id: payload}, 'w', { expiresIn: '1h'})   // *issue: setting secret to .env.JWT_SECRET == undefined
}

exports.registration = (req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        cell_no: req.body.cell_no,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        account_status: req.body.account_status,
        usertype: req.body.usertype
    });

    let result = {};

    user.save(user).then((response) => {
        console.log(response);
        let payload = response._id.toString();
        let token = generateToken(payload); //jwt token
        result = {
            user_id: response._id,
            first_name: response.first_name,
            last_name: response.last_name,
            cell_no: response.cell_no,
            email: response.email,
            account_status: response.account_status,
            usertype: response.usertype,
            token: token
        }
        return res.status(201).json(result);
    }).catch((err) => {
        console.log(err);
    });
}

exports.login = (req, res) => {
    User.findOne({
        email: req.body.email,
      }).then(response => {
    
        if (!response) {
          return res.status(404).send({ message: "User Not found." });
        } else{
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            response.password
          );
      
          if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password!" });
          }
          let payload = response._id.toString();
          let token = generateToken(payload); //jwt token
          result = {
              user_id: response._id,
              first_name: response.first_name,
              last_name: response.last_name,
              cell_no: response.cell_no,
              email: response.email,
              account_status: response.account_status,
              usertype: response.usertype,
              token: token
          }
          return res.status(201).json(result);
        }
    
        
        }).catch(err => {
          console.log(err)
        });
};


//Update profile
exports.updateProfile = (req, res) => {

    User.updateOne({_id: req.body.user_id}, {$set: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      cell_no: req.body.cell_no,
      email: req.body.email}}).then(data => {
        console.log(data)
        if(data.modifiedCount > 0 && data.matchedCount > 0){
          res.status(201).send({message: "User profile updated successful!"})
        } else{
          res.status(400).send({message: "Failed to update user profile"})
      }
      }).catch(err => {
        console.log(err);
      });
  }
  
  //Get all users
  exports.getAll = (req, res) => {
    User.find({email: req.body.email}).catch((response) => {
        console.log("get all: ", req.body.token);
        console.log(response);
        res.status(201).json(response);
    }).catch((err) => {
        console.log(err);
    });
};