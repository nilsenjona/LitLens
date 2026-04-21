import { createContext, useContext, useEffect, useState } from 'react';
import {
  searchBooks,
  getRecommendations,
  getLists,
  updateLists,
} from '../services/appServices';

const MAX_ROWS = 3;

const BookContext = createContext(null);

const emptyRow = () => ({ selected: null, searchHits: [], recs: [] });

const bookRef = book => ({
  key: book.key,
  title: book.title,
  author: book.author || (book.author_name && book.author_name[0]) || '',
  year: book.year || book.first_publish_year,
  cover_i: book.cover_i,
});

const sameBook = (a, b) => a && b && a.key === b.key;

export const BookProvider = ({ children }) => {
  const [view, setView] = useState('main');
  const [prevView, setPrevView] = useState('main');
  const [phase, setPhase] = useState('search');
  const [rows, setRows] = useState([emptyRow()]);
  const [detailsBook, setDetailsBook] = useState(null);

  const [readingList, setReadingList] = useState([]);
  const [booksRead, setBooksRead] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLists()
      .then(data => {
        setReadingList(data.readingList || []);
        setBooksRead(data.booksRead || []);
        setFavorites(data.favorites || []);
        setRatings(data.ratings || []);
      })
      .catch(err => setError(err.message));
  }, []);

  const persist = async partial => {
    try {
      await updateLists(partial);
    } catch (err) {
      setError(err.message);
    }
  };

  const search = async (rowIdx, fields) => {
    setError(null);
    setLoading(true);
    try {
      const docs = await searchBooks(fields);
      setRows(prev => prev.map((row, i) =>
        i === rowIdx ? { ...row, searchHits: docs } : row
      ));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectHit = (rowIdx, doc) => {
    const book = bookRef(doc);
    setRows(prev => prev.map((row, i) =>
      i === rowIdx ? { ...row, selected: book, searchHits: [] } : row
    ));
  };

  const addRow = () => {
    setRows(prev => (prev.length < MAX_ROWS ? [...prev, emptyRow()] : prev));
  };

  const fetchRecommendations = async () => {
    const sources = rows.map(r => r.selected).filter(Boolean);
    if (!sources.length) return;

    setError(null);
    setLoading(true);
    try {
      const results = await getRecommendations(sources);
      setRows(prev => prev.map((row, i) => {
        const match = results.find(r => sameBook(r.source, row.selected));
        return match ? { ...row, recs: match.recs } : row;
      }));
      setPhase('recommendations');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeRec = (rowIdx, recIdx) => {
    setRows(prev => prev.map((row, i) =>
      i === rowIdx
        ? { ...row, recs: row.recs.filter((_, j) => j !== recIdx) }
        : row
    ));
  };

  const openDetails = book => {
    if (!book || !book.key) return;
    setDetailsBook(book);
    setPrevView(view);
    setView('details');
  };

  const closeDetails = () => {
    setDetailsBook(null);
    setView(prevView);
  };

  const startOver = () => {
    setRows([emptyRow()]);
    setPhase('search');
    setDetailsBook(null);
    setView('main');
    setError(null);
  };

  const toggleInList = (list, setList, book, fieldName) => {
    const normalized = bookRef(book);
    const exists = list.some(b => b.key === normalized.key);
    const next = exists
      ? list.filter(b => b.key !== normalized.key)
      : [...list, normalized];
    setList(next);
    persist({ [fieldName]: next });
  };

  const toggleReadingList = book =>
    toggleInList(readingList, setReadingList, book, 'readingList');

  const toggleBooksRead = book =>
    toggleInList(booksRead, setBooksRead, book, 'booksRead');

  const toggleFavorite = book =>
    toggleInList(favorites, setFavorites, book, 'favorites');

  const setRating = (key, stars) => {
    const next = ratings.filter(r => r.key !== key);
    if (stars > 0) next.push({ key, stars });
    setRatings(next);
    persist({ ratings: next });
  };

  const getRating = key => {
    const found = ratings.find(r => r.key === key);
    return found ? found.stars : 0;
  };

  const isInReadingList = key => readingList.some(b => b.key === key);
  const isInBooksRead = key => booksRead.some(b => b.key === key);
  const isFavorite = key => favorites.some(b => b.key === key);

  const value = {
    view, setView,
    phase, setPhase,
    rows, detailsBook,
    readingList, booksRead, favorites, ratings,
    loading, error,
    search, selectHit, addRow,
    fetchRecommendations, removeRec,
    openDetails, closeDetails, startOver,
    toggleReadingList, toggleBooksRead, toggleFavorite,
    setRating, getRating,
    isInReadingList, isInBooksRead, isFavorite,
  };

  return (
    <BookContext.Provider value={value}>{children}</BookContext.Provider>
  );
};

export const useBooks = () => {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error('useBooks must be used within BookProvider');
  return ctx;
};

export { MAX_ROWS };
