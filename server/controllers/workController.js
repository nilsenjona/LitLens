'use strict';

const Api2Cache = require('../models/Api2Cache');
const openLibrary = require('../services/openLibrary');

const extractDescription = data => {
  if (!data.description) return '';
  if (typeof data.description === 'string') return data.description;
  if (typeof data.description.value === 'string') return data.description.value;
  return '';
};

exports.getWork = async (req, res, next) => {
  try {
    const { key } = req.query;

    if (!key || !key.startsWith('/works/')) {
      return res.status(400).json({
        error: 'Missing or invalid query: key (must start with /works/)',
      });
    }

    const cached = await Api2Cache.findOne({ key });
    if (cached) {
      return res.json({ key, description: cached.description });
    }

    const data = await openLibrary.getWork(key);
    const description = extractDescription(data);

    await Api2Cache.create({ key, description });
    res.json({ key, description });
  } catch (err) {
    next(err);
  }
};
