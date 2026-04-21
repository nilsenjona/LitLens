'use strict';

const mongoose = require('mongoose');

const recSchema = new mongoose.Schema({
  seq: Number,
  title: String,
  author: String,
  year: Number,
  isbn13: String,
  theme: String,
  reason: String,
}, { _id: false });

const api4CacheSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  recs: {
    type: [recSchema],
    default: [],
  },
});

module.exports = mongoose.model('Api4Cache', api4CacheSchema);
