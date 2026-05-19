import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';

function BooksReadPage() {
  const { booksRead, openDetails, setView } = useBooks();

  return (
    <main className="list-page">
      <button type="button" onClick={() => setView('main')}>← Back</button>
      <h2>Books Read</h2>

      {!booksRead.length ? (
        <p className="status">No books marked as read yet.</p>
      ) : (
        <div className="list-grid">
          {booksRead.map(book => (
            <BookCard
              key={book.key}
              book={book}
              onClick={() => openDetails(book)}
              showRating
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default BooksReadPage;
