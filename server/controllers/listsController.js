'use strict';

const Lists = require('../models/Lists');

const LISTS_ID = 'jon';
const FIELDS = ['readingList', 'booksRead', 'favorites', 'ratings'];

const ensureLists = async () => {
  let lists = await Lists.findById(LISTS_ID);
  if (!lists) {
    lists = await Lists.create({ _id: LISTS_ID });
  }
  return lists;
};

exports.getLists = async (req, res, next) => {
  try {
    const lists = await ensureLists();
    res.json(lists);
  } catch (err) {
    next(err);
  }
};

exports.updateLists = async (req, res, next) => {
  try {
    const update = {};
    for (const field of FIELDS) {
      if (req.body[field] !== undefined) {
        if (!Array.isArray(req.body[field])) {
          return res.status(400).json({
            error: `Field ${field} must be an array`,
          });
        }
        update[field] = req.body[field];
      }
    }

    if (!Object.keys(update).length) {
      return res.status(400).json({
        error: `Provide at least one of: ${FIELDS.join(', ')}`,
      });
    }

    await ensureLists();
    const lists = await Lists.findByIdAndUpdate(
      LISTS_ID,
      update,
      { new: true, runValidators: true }
    );
    res.json(lists);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};
