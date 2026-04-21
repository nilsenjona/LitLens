import BookCard from './BookCard';

function BookRow({ books, onCardClick, onCardRemove, extraClass = '' }) {
  return (
    <div className={`book-row ${extraClass}`}>
      {books.map((book, i) => (
        <BookCard
          key={book.key || `${book.title}-${i}`}
          book={book}
          onClick={onCardClick}
          onRemove={onCardRemove ? () => onCardRemove(i) : null}
        />
      ))}
    </div>
  );
}

export default BookRow;
