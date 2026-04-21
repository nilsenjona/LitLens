'use strict';

exports.normalizeQuery = q => q.trim().toLowerCase().replace(/\s+/g, ' ');

exports.pickDocFields = doc => ({
  key: doc.key,
  title: doc.title,
  author_name: doc.author_name || [],
  first_publish_year: doc.first_publish_year,
  cover_i: doc.cover_i,
});
