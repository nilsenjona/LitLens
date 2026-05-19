import mongoose, { Schema, Model } from 'mongoose';
import type { SearchDocApi } from '../types';

export interface IApi1CacheDoc {
  q: string;
  docs: SearchDocApi[];
}

const docSchema = new Schema<SearchDocApi>({
  key: String,
  title: String,
  author_name: [String],
  first_publish_year: Number,
  cover_i: Number,
}, { _id: false });

const api1CacheSchema = new Schema<IApi1CacheDoc>({
  q: { type: String, required: true, unique: true, index: true },
  docs: { type: [docSchema], default: [] },
});

const Api1Cache: Model<IApi1CacheDoc> = mongoose.model<IApi1CacheDoc>('Api1Cache', api1CacheSchema);
export default Api1Cache;
