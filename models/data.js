const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  DeviceID: {
    type: String,
    required: true,
  },
  Wtemp: {
    type: Number,
  },
  Atemp: {
    type: Number,
  },
  Rhumidity: {
    type: Number,
  },
  WaterLevel: {
    type: Number,
  },
  Status: {
    type: Number,
  },
  Type: {
    type: Number,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Data = mongoose.model("data", DataSchema);
