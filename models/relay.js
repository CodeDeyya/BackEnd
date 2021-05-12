const mongoose = require('mongoose');

const RelaySchema = new mongoose.Schema({
  
  R1: {
    type: String,
    
  },
  R2: {
    type: String,
    
  },
  R3: {
    type: String,
    
  },
  R4: {
    type: String,
    
  },
  R5: {
    type: String,
    
  },
  R6: {
    type: String,
    
  },
  R7: {
    type: String,
    
  },
  R8: {
    type: String,
    
  },
  R9: {
    type: String,
    
  },
  R10: {
    type: String,
    
  },
  R11: {
    type: String,
    
  },
  DeviceName:{
    type: String,
  },
  Email:{
    type: String,
  },
  Password:{
    type: String,
  },
  Status:{
    type: Number,
  },
  updated_date: {
  type: Date,
  default: Date.now
  }
});

module.exports = Relay = mongoose.model('relay', RelaySchema);