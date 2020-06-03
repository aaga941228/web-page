const { Schema, model } = require("mongoose");

const admin = new Schema({
  user: String,
  password: String,
});

module.exports = model("Admin", admin);
