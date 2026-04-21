import { useBooks } from '../context/BookContext';
import BookCard from '../components/BookCard';

function ReadingListPage() {
  const { readingList, openDetails, setView } = useBooks();

  return (
    <main className="list-page">
      <button type="button" onClick={() => setView('main')}>← Back</button>
      <h2>Books To Read</h2>

      {!readingList.length ? (
        <p className="status">No books in your reading list yet.</p>
      ) : (
        <div className="list-grid">
          {readingList.map(book => (
            <BookCard
              key={book.key}
              book={book}
              onClick={() => openDetails(book)}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default ReadingListPage;
