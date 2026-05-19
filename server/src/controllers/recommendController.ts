import type { Request, Response, NextFunction } from 'express';
import Api1Cache from '../models/Api1Cache';
import Api4Cache from '../models/Api4Cache';
import * as openLibrary from '../services/openLibrary';
import * as llm from '../services/llm';
import { normalizeQuery, pickDocFields } from '../util/helpers';
import type {
  ErrorBody,
  IncomingBook,
  RawRec,
  RecommendRequestBody,
  RecommendResponseBody,
  RecommendResult,
  ResolvedRec,
  SearchDocApi,
  StoredRec,
} from '../types';

const lookupWork = async (q: string): Promise<SearchDocApi | null> => {
  const qKey = normalizeQuery(q);

  const cached = await Api1Cache.findOne({ q: qKey }).lean();
  if (cached) return cached.docs[0] || null;

  const data = await openLibrary.searchWorks(q);
  const docs = (data.docs || []).slice(0, 5).map(pickDocFields);

  await Api1Cache.create({ q: qKey, docs });
  return docs[0] || null;
};

const resolveRec = async (rec: StoredRec): Promise<ResolvedRec> => {
  let doc: SearchDocApi | null = null;

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

const getRecsForBook = async (book: IncomingBook): Promise<StoredRec[]> => {
  const cached = await Api4Cache.findOne({ key: book.key }).lean();
  if (cached) return cached.recs;

  const recs: RawRec[] = await llm.getRecommendations({
    title: book.title,
    author: book.author,
    year: book.year,
  });

  const stored: StoredRec[] = recs.slice(0, 3).map((r, i) => ({
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

export const recommend = async (
  req: Request<unknown, RecommendResponseBody | ErrorBody, RecommendRequestBody>,
  res: Response<RecommendResponseBody | ErrorBody>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { books } = req.body;

    if (!Array.isArray(books) || !books.length) {
      res.status(400).json({
        error: 'Missing required field: books (non-empty array)',
      });
      return;
    }

    const results: RecommendResult[] = [];
    for (const book of books) {
      if (!book.key || !book.title) {
        res.status(400).json({ error: 'Each book must have key and title' });
        return;
      }

      const recs = await getRecsForBook(book);
      const resolved: ResolvedRec[] = [];
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
