const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  DeviceID: {
    type: String,
    required: true
  },
  Wtemp: {
    type: Number,
    
  },
  Atemp: {
    type: Number,
    
  },
  Rhumidity: {
    type: Number
  },
  WaterLevel: {
    type: Number,
    required: true
  },
  Status:{
    type: Number
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Log = mongoose.model('log', LogSchema);