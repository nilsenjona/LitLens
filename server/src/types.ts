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

export interface IncomingBook {
  key: string;
  title: string;
  author?: string;
  year?: number;
  cover_i?: number;
}

export interface SearchDocApi {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface StoredRec {
  seq: number;
  title: string;
  author: string;
  year?: number;
  isbn13: string;
  theme: string;
  reason: string;
}

export interface ResolvedRec extends StoredRec {
  key: string;
  cover_i?: number;
}

export interface RawRec {
  seq?: number;
  title?: string;
  author?: string;
  year?: number;
  isbn13?: string;
  theme?: string;
  reason?: string;
}

export interface SearchResponseBody {
  docs: SearchDocApi[];
}

export interface WorkResponseBody {
  key: string;
  description: string;
}

export interface RecommendRequestBody {
  books: IncomingBook[];
}

export interface RecommendResult {
  source: IncomingBook;
  recs: ResolvedRec[];
}

export interface RecommendResponseBody {
  results: RecommendResult[];
}

export interface ListsBody {
  readingList?: BookRef[];
  booksRead?: BookRef[];
  favorites?: BookRef[];
  ratings?: Rating[];
}

export interface ErrorBody {
  error: string;
}

export interface OpenLibrarySearchDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  [k: string]: unknown;
}

export interface OpenLibrarySearchResult {
  docs?: OpenLibrarySearchDoc[];
  [k: string]: unknown;
}

export interface OpenLibraryWork {
  description?: string | { value?: string };
  [k: string]: unknown;
}

export interface AnthropicMessagesResponse {
  content: Array<{ text: string }>;
  [k: string]: unknown;
}
