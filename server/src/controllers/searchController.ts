import type { Request, Response, NextFunction } from 'express';
import Api1Cache from '../models/Api1Cache';
import * as openLibrary from '../services/openLibrary';
import { normalizeQuery, pickDocFields } from '../util/helpers';
import type { ErrorBody, SearchResponseBody } from '../types';

const MAX_HITS = 5;

interface SearchQuery {
  q?: string;
}

export const search = async (
  req: Request<unknown, SearchResponseBody | ErrorBody, unknown, SearchQuery>,
  res: Response<SearchResponseBody | ErrorBody>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      res.status(400).json({ error: 'Missing required query: q' });
      return;
    }

    const qKey = normalizeQuery(q);

    const cached = await Api1Cache.findOne({ q: qKey }).lean();
    if (cached) {
      res.json({ docs: cached.docs });
      return;
    }

    const data = await openLibrary.searchWorks(q);
    const docs = (data.docs || []).slice(0, MAX_HITS).map(pickDocFields);

    await Api1Cache.create({ q: qKey, docs });
    res.json({ docs });
  } catch (err) {
    next(err);
  }
};
