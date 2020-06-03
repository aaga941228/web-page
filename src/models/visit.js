const { Schema, model } = require("mongoose");

const visit = new Schema({
  counter: String,
  count: { type: Number, default: 0 },
});

module.exports = model("visit", visit);
