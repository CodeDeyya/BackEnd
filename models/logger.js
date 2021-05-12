const mongoose = require('mongoose');

const LoggerSchema = new mongoose.Schema({
  Germination: {
    type: Number,
    
  },
  EarlyVeg: {
    type: Number,
    
  },
  MidVeg: {
    type: Number,
    
  },
  LateVeg: {
    type: Number,
    
  },
  Transition: {
    type: Number,
    
  },
  Flower: {
    type: Number,
  },
  Flush: {
    type: Number,
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = logger = mongoose.model('logger', LoggerSchema);