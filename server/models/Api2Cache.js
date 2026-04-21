'use strict';

const mongoose = require('mongoose');

const api2CacheSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Api2Cache', api2CacheSchema);
