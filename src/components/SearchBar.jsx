import React from 'react';
import { useSearch } from '../context/SearchContext';

function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      type="text"
      placeholder="Search"
      className="input input-bordered w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    />
  );
}

export default SearchBar;
