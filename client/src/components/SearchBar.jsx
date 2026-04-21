import { useState } from 'react';

function SearchBar({ onSubmit, disabled }) {
  const [form, setForm] = useState({ title: '', author: '', isbn: '' });

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="author"
        placeholder="Author (optional)"
        value={form.author}
        onChange={handleChange}
      />
      <input
        name="isbn"
        placeholder="ISBN (optional)"
        value={form.isbn}
        onChange={handleChange}
      />
      <button type="submit" disabled={disabled}>Search</button>
    </form>
  );
}

export default SearchBar;
