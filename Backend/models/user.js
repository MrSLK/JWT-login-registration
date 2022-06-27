const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name: String,
    last_name: String,
    cell_no: String,
    email: String,
    password: String,
    account_status: Boolean,
    usertype: String
  },{
    timestamps: true
  })
);

module.exports = User;