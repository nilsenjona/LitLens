import type { OpenLibrarySearchDoc, SearchDocApi } from '../types';

export const normalizeQuery = (q: string): string =>
  q.trim().toLowerCase().replace(/\s+/g, ' ');

export const pickDocFields = (doc: OpenLibrarySearchDoc): SearchDocApi => ({
  key: doc.key,
  title: doc.title,
  author_name: doc.author_name || [],
  first_publish_year: doc.first_publish_year,
  cover_i: doc.cover_i,
});
