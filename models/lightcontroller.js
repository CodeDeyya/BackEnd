const mongoose = require("mongoose");

const LightSchema = new mongoose.Schema({
  DeviceID: {
    type: String,
    required: true,
  },
  Type: {
    type: Number,
  },
});

module.exports = Light = mongoose.model("Light", LightSchema);
