import type {
  IncomingBook,
  ListsData,
  RecommendResult,
  SearchDoc,
  SearchFields,
} from '../types';

const API_URL = 'http://127.0.0.1:3000/api';

const buildSearchQuery = ({ title, author, isbn }: SearchFields): string => {
  if (isbn && isbn.trim()) {
    return isbn.replace(/\D/g, '');
  }
  return [title, author].filter((s): s is string => !!(s && s.trim())).join(' ').trim();
};

export const searchBooks = async (fields: SearchFields): Promise<SearchDoc[]> => {
  const q = buildSearchQuery(fields);
  if (!q) throw new Error('Enter a title, author, or ISBN');

  const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error('Failed to search books');
  const data = await res.json() as { docs: SearchDoc[] };
  return data.docs;
};

export const getWorkDescription = async (key: string): Promise<string> => {
  const res = await fetch(`${API_URL}/work?key=${encodeURIComponent(key)}`);
  if (!res.ok) throw new Error('Failed to fetch book description');
  const data = await res.json() as { key: string; description: string };
  return data.description;
};

export const getRecommendations = async (books: IncomingBook[]): Promise<RecommendResult[]> => {
  const res = await fetch(`${API_URL}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ books }),
  });
  if (!res.ok) throw new Error('Failed to fetch recommendations');
  const data = await res.json() as { results: RecommendResult[] };
  return data.results;
};

export const getLists = async (): Promise<ListsData> => {
  const res = await fetch(`${API_URL}/lists`);
  if (!res.ok) throw new Error('Failed to fetch lists');
  return res.json() as Promise<ListsData>;
};

export const updateLists = async (partial: Partial<ListsData>): Promise<ListsData> => {
  const res = await fetch(`${API_URL}/lists`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partial),
  });
  if (!res.ok) throw new Error('Failed to update lists');
  return res.json() as Promise<ListsData>;
};
