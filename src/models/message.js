const { Schema, model } = require("mongoose");

const message = new Schema({
  email: String,
  name: String,
  message: String,
});

module.exports = model("Message", message);
