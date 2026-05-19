'use strict';

const Api1Cache = require('../models/Api1Cache');
const Api4Cache = require('../models/Api4Cache');
const openLibrary = require('../services/openLibrary');
const llm = require('../services/llm');
const { normalizeQuery, pickDocFields } = require('../util/helpers');

const lookupWork = async q => {
  const qKey = normalizeQuery(q);

  const cached = await Api1Cache.findOne({ q: qKey }).lean();
  if (cached) return cached.docs[0] || null;

  const data = await openLibrary.searchWorks(q);
  const docs = (data.docs || []).slice(0, 5).map(pickDocFields);

  await Api1Cache.create({ q: qKey, docs });
  return docs[0] || null;
};

const resolveRec = async rec => {
  let doc = null;

  if (rec.isbn13 && /^\d{13}$/.test(rec.isbn13)) {
    doc = await lookupWork(rec.isbn13);
  }

  if (!doc && rec.title) {
    const q = rec.author ? `${rec.title} ${rec.author}` : rec.title;
    doc = await lookupWork(q);
  }

  return {
    seq: rec.seq,
    title: rec.title || '',
    author: rec.author || '',
    year: typeof rec.year === 'number' ? rec.year : undefined,
    isbn13: rec.isbn13 || '',
    theme: rec.theme || '',
    reason: rec.reason || '',
    key: doc ? doc.key : '',
    cover_i: doc ? doc.cover_i : undefined,
  };
};

const getRecsForBook = async book => {
  const cached = await Api4Cache.findOne({ key: book.key }).lean();
  if (cached) return cached.recs;

  const recs = await llm.getRecommendations({
    title: book.title,
    author: book.author,
    year: book.year,
  });

  const stored = recs.slice(0, 3).map((r, i) => ({
    seq: i + 1,
    title: r.title || '',
    author: r.author || '',
    year: typeof r.year === 'number' ? r.year : undefined,
    isbn13: r.isbn13 || '',
    theme: r.theme || '',
    reason: r.reason || '',
  }));

  await Api4Cache.create({ key: book.key, recs: stored });
  return stored;
};

exports.recommend = async (req, res, next) => {
  try {
    const { books } = req.body;

    if (!Array.isArray(books) || !books.length) {
      return res.status(400).json({
        error: 'Missing required field: books (non-empty array)',
      });
    }

    const results = [];
    for (const book of books) {
      if (!book.key || !book.title) {
        return res.status(400).json({
          error: 'Each book must have key and title',
        });
      }

      const recs = await getRecsForBook(book);
      const resolved = [];
      for (const rec of recs) {
        resolved.push(await resolveRec(rec));
      }

      results.push({ source: book, recs: resolved });
    }

    res.json({ results });
  } catch (err) {
    next(err);
  }
};
