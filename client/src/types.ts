export interface BookRef {
  key: string;
  title: string;
  author: string;
  year?: number;
  cover_i?: number;
}

export interface Rating {
  key: string;
  stars: number;
}

export interface SearchDoc {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface SearchFields {
  title?: string;
  author?: string;
  isbn?: string;
}

export interface IncomingBook {
  key: string;
  title: string;
  author?: string;
  year?: number;
  cover_i?: number;
}

export interface ResolvedRec {
  seq: number;
  title: string;
  author: string;
  year?: number;
  isbn13: string;
  theme: string;
  reason: string;
  key: string;
  cover_i?: number;
}

export interface RecommendResult {
  source: IncomingBook;
  recs: ResolvedRec[];
}

export interface ListsData {
  _id?: string;
  readingList: BookRef[];
  booksRead: BookRef[];
  favorites: BookRef[];
  ratings: Rating[];
}
