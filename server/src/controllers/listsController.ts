import type { Request, Response, NextFunction } from 'express';
import Lists, { type IListsDoc } from '../models/Lists';
import type { BookRef, ErrorBody, ListsBody, Rating } from '../types';

const LISTS_ID = 'jon';
const FIELDS = ['readingList', 'booksRead', 'favorites', 'ratings'] as const;
type ListField = typeof FIELDS[number];

const ensureLists = async (): Promise<IListsDoc> => {
  let lists = await Lists.findById(LISTS_ID);
  if (!lists) {
    lists = await Lists.create({ _id: LISTS_ID });
  }
  return lists;
};

export const getLists = async (
  _req: Request<unknown, IListsDoc | ErrorBody>,
  res: Response<IListsDoc | ErrorBody>,
  next: NextFunction,
): Promise<void> => {
  try {
    const lists = await ensureLists();
    res.json(lists);
  } catch (err) {
    next(err);
  }
};

export const updateLists = async (
  req: Request<unknown, IListsDoc | ErrorBody, ListsBody>,
  res: Response<IListsDoc | ErrorBody>,
  next: NextFunction,
): Promise<void> => {
  try {
    const update: Partial<Pick<IListsDoc, ListField>> = {};
    for (const field of FIELDS) {
      const value = req.body[field];
      if (value !== undefined) {
        if (!Array.isArray(value)) {
          res.status(400).json({ error: `Field ${field} must be an array` });
          return;
        }
        if (field === 'ratings') {
          update.ratings = value as Rating[];
        } else {
          update[field] = value as BookRef[];
        }
      }
    }

    if (!Object.keys(update).length) {
      res.status(400).json({
        error: `Provide at least one of: ${FIELDS.join(', ')}`,
      });
      return;
    }

    await ensureLists();
    const lists = await Lists.findByIdAndUpdate(
      LISTS_ID,
      update,
      { new: true, runValidators: true },
    );
    if (!lists) {
      res.status(500).json({ error: 'Lists document missing after ensure' });
      return;
    }
    res.json(lists);
  } catch (err) {
    if (err instanceof Error && err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
      return;
    }
    next(err);
  }
};
