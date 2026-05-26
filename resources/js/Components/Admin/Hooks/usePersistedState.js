import { useState, useEffect } from 'react';

export function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
