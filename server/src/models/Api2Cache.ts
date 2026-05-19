import mongoose, { Schema, Model } from 'mongoose';

export interface IApi2CacheDoc {
  key: string;
  description: string;
}

const api2CacheSchema = new Schema<IApi2CacheDoc>({
  key: { type: String, required: true, unique: true, index: true },
  description: { type: String, default: '' },
});

const Api2Cache: Model<IApi2CacheDoc> = mongoose.model<IApi2CacheDoc>('Api2Cache', api2CacheSchema);
export default Api2Cache;
