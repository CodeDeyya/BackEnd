const mongoose = require("mongoose");

const WaterChange = new mongoose.Schema({
  DeviceID: {
    type: String,
    required: true,
  },
  LastChange: {
    type: Date,
    required: true,
  },
  DateNow: {
    type: Date,
    required: true,
  },
});

module.exports = Book = mongoose.model("WaterChange", WaterChange);
