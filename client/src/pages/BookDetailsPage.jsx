import { useEffect, useState } from 'react';
import { useBooks } from '../context/BookContext';
import { getWorkDescription } from '../services/appServices';
import { buildCoverUrl } from '../services/coverUrl';

function BookDetailsPage() {
  const {
    detailsBook, closeDetails,
    isInReadingList, isInBooksRead, isFavorite,
    toggleReadingList, toggleBooksRead, toggleFavorite,
    setRating, getRating,
  } = useBooks();

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!detailsBook || !detailsBook.key) return;
    setLoading(true);
    setError(null);
    getWorkDescription(detailsBook.key)
      .then(desc => {
        setDescription(desc);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [detailsBook]);

  if (!detailsBook) {
    return (
      <main className="details-page">
        <button type="button" onClick={closeDetails}>← Back</button>
        <p className="status">No book selected.</p>
      </main>
    );
  }

  const book = detailsBook;
  const cover = buildCoverUrl(book.cover_i, 'L');
  const favorite = isFavorite(book.key);
  const inReading = isInReadingList(book.key);
  const read = isInBooksRead(book.key);
  const stars = getRating(book.key);

  const fallbackText = description || book.theme || '';

  return (
    <main className="details-page">
      <button type="button" onClick={closeDetails}>← Back</button>

      <div className="details-layout">
        <div className="details-cover">
          {cover
            ? <img src={cover} alt={book.title} />
            : <div className="book-cover-placeholder large">No cover</div>
          }
          <div className="book-actions">
            <button
              type="button"
              className={`action-btn heart ${favorite ? 'active' : ''}`}
              title="Favorite"
              onClick={() => toggleFavorite(book)}
            >
              ♥
            </button>
            <button
              type="button"
              className={`action-btn tick ${inReading ? 'active' : ''}`}
              title="Add to reading list"
              onClick={() => toggleReadingList(book)}
            >
              ✓
            </button>
          </div>
        </div>

        <div className="details-info">
          <h2>{book.title} {book.year && <span className="year">({book.year})</span>}</h2>
          <p className="author">{book.author}</p>

          {loading && <p className="status">Loading description...</p>}
          {error && <p className="status error">Error: {error}</p>}
          {!loading && !error && (
            <p className="description">{fallbackText || 'No description available.'}</p>
          )}

          {book.reason && (
            <p className="reason"><strong>Why this book:</strong> {book.reason}</p>
          )}

          <div className="details-controls">
            <label className="read-toggle">
              <input
                type="checkbox"
                checked={read}
                onChange={() => toggleBooksRead(book)}
              />
              Mark as read
            </label>

            <div className="rating">
              <span>Rating:</span>
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  type="button"
                  className={`star ${n <= stars ? 'active' : ''}`}
                  onClick={() => setRating(book.key, n === stars ? 0 : n)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookDetailsPage;
