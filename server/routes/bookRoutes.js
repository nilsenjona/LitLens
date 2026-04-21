'use strict';

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const workController = require('../controllers/workController');
const recommendController = require('../controllers/recommendController');

router.get('/search', searchController.search);
router.get('/work', workController.getWork);
router.post('/recommend', recommendController.recommend);

module.exports = router;
