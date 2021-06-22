const mongoose = require("mongoose");

const WaterChange = new mongoose.Schema({
  DeviceID: {
    type: String,
    required: true,
  },
  LastChange: {
    type: Date,
  },
  DateNow: {
    type: Date,
  },
});

module.exports = Book = mongoose.model("WaterChange", WaterChange);
