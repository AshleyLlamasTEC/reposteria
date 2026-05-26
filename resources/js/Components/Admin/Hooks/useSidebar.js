import { useState, useCallback } from 'react';
import { usePersistedState } from './usePersistedState';

export function useSidebar() {
  const [isOpen, setIsOpen] = usePersistedState('admin-sidebar-open', true);
  const [isCollapsed, setIsCollapsed] = usePersistedState('admin-sidebar-collapsed', false);

  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const toggleCollapse = useCallback(() => setIsCollapsed(prev => !prev), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, isCollapsed, toggle, toggleCollapse, open, close, setIsOpen };
}
