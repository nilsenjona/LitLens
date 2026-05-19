import mongoose, { Schema, Model } from 'mongoose';
import type { StoredRec } from '../types';

export interface IApi4CacheDoc {
  key: string;
  recs: StoredRec[];
}

const recSchema = new Schema<StoredRec>({
  seq: Number,
  title: String,
  author: String,
  year: Number,
  isbn13: String,
  theme: String,
  reason: String,
}, { _id: false });

const api4CacheSchema = new Schema<IApi4CacheDoc>({
  key: { type: String, required: true, unique: true, index: true },
  recs: { type: [recSchema], default: [] },
});

const Api4Cache: Model<IApi4CacheDoc> = mongoose.model<IApi4CacheDoc>('Api4Cache', api4CacheSchema);
export default Api4Cache;
