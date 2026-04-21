'use strict';

const mongoose = require('mongoose');

const bookRefSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  cover_i: {
    type: Number,
  },
}, { _id: false });

const ratingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
}, { _id: false });

const listsSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  readingList: {
    type: [bookRefSchema],
    default: [],
  },
  booksRead: {
    type: [bookRefSchema],
    default: [],
  },
  favorites: {
    type: [bookRefSchema],
    default: [],
  },
  ratings: {
    type: [ratingSchema],
    default: [],
  },
});

module.exports = mongoose.model('Lists', listsSchema);
