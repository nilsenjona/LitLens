import type { OpenLibrarySearchResult, OpenLibraryWork } from '../types';

const USER_AGENT = 'LitLens temporary student app (nilsenjona@gmail.com)';
const MAX_CALLS = 3;
const WINDOW_MS = 1500;

const callTimestamps: number[] = [];

const waitForSlot = async (): Promise<void> => {
  while (true) {
    const now = Date.now();
    while (callTimestamps.length && now - callTimestamps[0] >= WINDOW_MS) {
      callTimestamps.shift();
    }
    if (callTimestamps.length < MAX_CALLS) {
      callTimestamps.push(now);
      return;
    }
    const waitMs = WINDOW_MS - (now - callTimestamps[0]);
    await new Promise(resolve => setTimeout(resolve, waitMs));
  }
};

export const searchWorks = async (q: string): Promise<OpenLibrarySearchResult> => {
  await waitForSlot();
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&language=eng`;
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
  });
  if (!res.ok) throw new Error(`Open Library search failed (${res.status})`);
  return res.json() as Promise<OpenLibrarySearchResult>;
};

export const getWork = async (key: string): Promise<OpenLibraryWork> => {
  await waitForSlot();
  const url = `https://openlibrary.org${key}.json`;
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
  });
  if (!res.ok) throw new Error(`Open Library work fetch failed (${res.status})`);
  return res.json() as Promise<OpenLibraryWork>;
};
