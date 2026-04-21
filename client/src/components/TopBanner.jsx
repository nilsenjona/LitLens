import { useBooks } from '../context/BookContext';

function TopBanner() {
  const { setView } = useBooks();

  return (
    <header className="top-banner">
      <h1 className="logo" onClick={() => setView('main')}>LitLens</h1>
      <nav className="top-nav">
        <button type="button" onClick={() => setView('booksRead')}>Books Read</button>
        <button type="button" onClick={() => setView('readingList')}>Books To Read</button>
      </nav>
      <div className="user-badge">
        <span className="user-name">Jon</span>
        <img src="/Jon.jpg" alt="Jon" className="user-avatar" />
      </div>
    </header>
  );
}

export default TopBanner;
