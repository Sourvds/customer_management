import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import useCustomerStore from '../store/customerStore';
import type { SortOption } from '../types';
import styles from './FilterDropdown.module.css';

const FilterDropdown: React.FC = () => {
  const { sortOption, setSortOption } = useCustomerStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { label: string; value: SortOption }[] = [
    { label: 'Newest First', value: { by: 'date', order: 'desc' } },
    { label: 'Oldest First', value: { by: 'date', order: 'asc' } },
    { label: 'A - Z (Name)', value: { by: 'name', order: 'asc' } },
    { label: 'Z - A (Name)', value: { by: 'name', order: 'desc' } },
  ];

  const getCurrentLabel = () => {
    const current = options.find(
      (opt) => opt.value.by === sortOption.by && opt.value.order === sortOption.order
    );
    return current?.label || 'Sort by';
  };

  const handleSelect = (option: SortOption) => {
    setSortOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.trigger} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-label="Sort options"
      >
        <span>{getCurrentLabel()}</span>
        <FiChevronDown className={styles.icon} />
      </button>

      {isOpen && (
        <div className={styles.menu} role="listbox">
          {options.map((option) => (
            <button
              key={`${option.value.by}-${option.value.order}`}
              className={`${styles.option} ${
                sortOption.by === option.value.by && sortOption.order === option.value.order
                  ? styles.selected
                  : ''
              }`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={
                sortOption.by === option.value.by && sortOption.order === option.value.order ? 'true' : 'false'
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
