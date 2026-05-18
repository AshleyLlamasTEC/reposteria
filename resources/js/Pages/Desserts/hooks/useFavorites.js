import { useState } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };
  return { favorites, toggleFavorite };
}
