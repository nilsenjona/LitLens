'use strict';

const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  key: String,
  title: String,
  author_name: [String],
  first_publish_year: Number,
  cover_i: Number,
}, { _id: false });

const api1CacheSchema = new mongoose.Schema({
  q: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  docs: {
    type: [docSchema],
    default: [],
  },
});

module.exports = mongoose.model('Api1Cache', api1CacheSchema);
