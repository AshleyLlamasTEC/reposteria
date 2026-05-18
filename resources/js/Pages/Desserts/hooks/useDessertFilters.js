import { useState, useMemo } from 'react';
import { filterDesserts } from '../utils/dessert.filters';
import { sortDesserts } from '../utils/dessert.sorter';

export function useDessertFilters(desserts) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('popular');

  const filtered = useMemo(() => filterDesserts(desserts, { searchQuery, category: selectedCategory, priceRange }),
    [desserts, searchQuery, selectedCategory, priceRange]);

  const sorted = useMemo(() => sortDesserts(filtered, sortBy), [filtered, sortBy]);

  return {
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    priceRange, setPriceRange,
    sortBy, setSortBy,
    filteredDesserts: sorted,
    totalCount: desserts.length,
    filteredCount: sorted.length
  };
}
