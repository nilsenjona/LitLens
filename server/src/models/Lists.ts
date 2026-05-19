import mongoose, { Schema, Model } from 'mongoose';
import type { BookRef, Rating } from '../types';

export interface IListsDoc {
  _id: string;
  readingList: BookRef[];
  booksRead: BookRef[];
  favorites: BookRef[];
  ratings: Rating[];
}

const bookRefSchema = new Schema<BookRef>({
  key: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number },
  cover_i: { type: Number },
}, { _id: false });

const ratingSchema = new Schema<Rating>({
  key: { type: String, required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
}, { _id: false });

const listsSchema = new Schema<IListsDoc>({
  _id: { type: String },
  readingList: { type: [bookRefSchema], default: [] },
  booksRead: { type: [bookRefSchema], default: [] },
  favorites: { type: [bookRefSchema], default: [] },
  ratings: { type: [ratingSchema], default: [] },
});

const Lists: Model<IListsDoc> = mongoose.model<IListsDoc>('Lists', listsSchema);
export default Lists;
