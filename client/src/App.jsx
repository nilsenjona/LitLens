import './App.css';
import { useBooks } from './context/BookContext';
import TopBanner from './components/TopBanner';
import MainPage from './pages/MainPage';
import BookDetailsPage from './pages/BookDetailsPage';
import ReadingListPage from './pages/ReadingListPage';
import BooksReadPage from './pages/BooksReadPage';

function App() {
  const { view } = useBooks();

  return (
    <div className="app">
      <TopBanner />
      {view === 'main' && <MainPage />}
      {view === 'details' && <BookDetailsPage />}
      {view === 'readingList' && <ReadingListPage />}
      {view === 'booksRead' && <BooksReadPage />}
      <footer className="bottom-banner">
        <span>Contact Us</span>
        <span>About Us</span>
        <span>Terms and Conditions</span>
      </footer>
    </div>
  );
}

export default App;
