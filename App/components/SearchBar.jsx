import React from 'react';
import './SearchBar.css'; // import css

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Company name, ticker..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      <form action="" method="get">
        <button
          className="search-button"
          type="button"
        >
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
