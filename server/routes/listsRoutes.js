'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/listsController');

router.get('/lists', controller.getLists);
router.put('/lists', controller.updateLists);

module.exports = router;
