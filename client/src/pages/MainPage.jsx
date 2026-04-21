import { useBooks, MAX_ROWS } from '../context/BookContext';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import BookRow from '../components/BookRow';
import StartOverButton from '../components/StartOverButton';

function MainPage() {
  const {
    phase, rows,
    loading, error,
    search, selectHit, addRow,
    fetchRecommendations, removeRec,
    openDetails,
  } = useBooks();

  const activeRowIdx = rows.findIndex(r => !r.selected);
  const selectedCount = rows.filter(r => r.selected).length;
  const canAddRow = phase === 'search' && selectedCount > 0 && rows.length < MAX_ROWS && activeRowIdx === -1;
  const canRecommend = phase === 'search' && selectedCount > 0 && activeRowIdx === -1;

  const handleSearch = fields => {
    if (activeRowIdx === -1) return;
    search(activeRowIdx, fields);
  };

  const showSearchBar = phase === 'search' && activeRowIdx !== -1;

  return (
    <main className="main-page">
      {showSearchBar && (
        <SearchBar onSubmit={handleSearch} disabled={loading} />
      )}

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">Error: {error}</p>}

      <div className="rows">
        {rows.map((row, i) => (
          <div key={i} className="row-wrapper">
            {row.selected && phase === 'recommendations' ? (
              <div className="rec-row">
                <BookCard
                  book={row.selected}
                  onClick={() => openDetails(row.selected)}
                />
                <BookRow
                  books={row.recs}
                  onCardClick={rec => openDetails(rec)}
                  onCardRemove={recIdx => removeRec(i, recIdx)}
                  extraClass="recs"
                />
              </div>
            ) : row.selected ? (
              <BookRow
                books={[row.selected]}
                onCardClick={() => openDetails(row.selected)}
              />
            ) : row.searchHits.length > 0 ? (
              <BookRow
                books={row.searchHits}
                onCardClick={doc => selectHit(i, doc)}
              />
            ) : (
              <div className="row-placeholder">Search for a book above</div>
            )}
          </div>
        ))}
      </div>

      <div className="main-actions">
        {canAddRow && (
          <button type="button" onClick={addRow}>Add book</button>
        )}
        {canRecommend && (
          <button type="button" className="primary" onClick={fetchRecommendations}>
            Get Similar Books
          </button>
        )}
        <StartOverButton />
      </div>
    </main>
  );
}

export default MainPage;
