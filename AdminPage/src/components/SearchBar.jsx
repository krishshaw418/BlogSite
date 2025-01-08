import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
const SearchBar = ({ data, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    const filteredData = data.filter((item) =>
      item.heading.toLowerCase().includes(query.toLowerCase())
    );
    
    onSearch(filteredData);
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="relative w-full max-w-md">
      <div className="flex items-center border border-gray-300 rounded-md px-2 py-2 w-full">
          <FaSearch className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search..."
            className="flex-1 outline-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;