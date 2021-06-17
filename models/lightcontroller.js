const mongoose = require("mongoose");

const Light = new mongoose.Schema({
  DeviceID: {
    type: String,
    required: true,
  },
  LastChange: {
    type: Date,
    required: true,
  },
});

module.exports = Book = mongoose.model("Light", Light);
