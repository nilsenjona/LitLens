'use strict';

const Api1Cache = require('../models/Api1Cache');
const openLibrary = require('../services/openLibrary');
const { normalizeQuery, pickDocFields } = require('../util/helpers');

const MAX_HITS = 5;

exports.search = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        error: 'Missing required query: q',
      });
    }

    const qKey = normalizeQuery(q);

    const cached = await Api1Cache.findOne({ q: qKey }).lean();
    if (cached) {
      return res.json({ docs: cached.docs });
    }

    const data = await openLibrary.searchWorks(q);
    const docs = (data.docs || []).slice(0, MAX_HITS).map(pickDocFields);

    await Api1Cache.create({ q: qKey, docs });
    res.json({ docs });
  } catch (err) {
    next(err);
  }
};
