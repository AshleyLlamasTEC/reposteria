import { createContext, useContext, useMemo } from 'react';
import { useSidebar } from '@/Components/Admin/Hooks/useSidebar';
import { useBreakpoint } from '@/Components/Admin/Hooks/useBreakpoint';

const AdminContext = createContext({});

export function AdminProvider({ children }) {
  const sidebar = useSidebar();
  const isMobile = useBreakpoint('(max-width: 1023px)');
  const value = useMemo(() => ({ sidebar, isMobile }), [sidebar, isMobile]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export const useAdmin = () => useContext(AdminContext);
