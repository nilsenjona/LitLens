import { useBooks } from '../context/BookContext';
import { buildCoverUrl } from '../services/coverUrl';

function BookCard({ book, onClick, onRemove, showActions = true, showRating = false }) {
  const {
    isInReadingList,
    isFavorite,
    toggleReadingList,
    toggleFavorite,
    getRating,
    setRating,
  } = useBooks();

  const cover = buildCoverUrl(book.cover_i);
  const inReading = isInReadingList(book.key);
  const favorite = isFavorite(book.key);
  const stars = showRating ? getRating(book.key) : 0;

  const handleOpen = () => {
    if (onClick && book.key) onClick(book);
  };

  const stop = fn => e => {
    e.stopPropagation();
    fn();
  };

  return (
    <div className="book-card" onClick={handleOpen}>
      <div className="book-cover">
        {cover
          ? <img src={cover} alt={book.title} />
          : <div className="book-cover-placeholder">No cover</div>
        }
        {showActions && book.key && (
          <div className="book-actions">
            <button
              type="button"
              className={`action-btn heart ${favorite ? 'active' : ''}`}
              title="Favorite"
              onClick={stop(() => toggleFavorite(book))}
            >
              ♥
            </button>
            <button
              type="button"
              className={`action-btn tick ${inReading ? 'active' : ''}`}
              title="Add to reading list"
              onClick={stop(() => toggleReadingList(book))}
            >
              ✓
            </button>
            {onRemove && (
              <button
                type="button"
                className="action-btn close"
                title="Remove"
                onClick={stop(onRemove)}
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-author">{book.author || (book.author_name && book.author_name[0]) || ''}</div>
        <div className="book-year">{book.year || book.first_publish_year || ''}</div>
        {showRating && (
          <div className="book-rating">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                type="button"
                className={`card-star ${n <= stars ? 'active' : ''}`}
                title={`Rate ${n}`}
                onClick={stop(() => setRating(book.key, n === stars ? 0 : n))}
              >
                ★
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;
