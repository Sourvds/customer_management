import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import useCustomerStore from '../store/customerStore';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = useCustomerStore();
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className={`${styles.searchContainer} ${isFocused ? styles.focused : ''}`}>
      <FiSearch className={styles.icon} aria-hidden="true" />
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={styles.input}
        aria-label="Search customers"
      />
      {searchTerm && (
        <button
          className={styles.clearBtn}
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
