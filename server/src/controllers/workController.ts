import type { Request, Response, NextFunction } from 'express';
import Api2Cache from '../models/Api2Cache';
import * as openLibrary from '../services/openLibrary';
import type { ErrorBody, OpenLibraryWork, WorkResponseBody } from '../types';

const extractDescription = (data: OpenLibraryWork): string => {
  if (!data.description) return '';
  if (typeof data.description === 'string') return data.description;
  if (typeof data.description.value === 'string') return data.description.value;
  return '';
};

interface WorkQuery {
  key?: string;
}

export const getWork = async (
  req: Request<unknown, WorkResponseBody | ErrorBody, unknown, WorkQuery>,
  res: Response<WorkResponseBody | ErrorBody>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { key } = req.query;

    if (!key || !key.startsWith('/works/')) {
      res.status(400).json({
        error: 'Missing or invalid query: key (must start with /works/)',
      });
      return;
    }

    const cached = await Api2Cache.findOne({ key }).lean();
    if (cached) {
      res.json({ key, description: cached.description });
      return;
    }

    const data = await openLibrary.getWork(key);
    const description = extractDescription(data);

    await Api2Cache.create({ key, description });
    res.json({ key, description });
  } catch (err) {
    next(err);
  }
};
