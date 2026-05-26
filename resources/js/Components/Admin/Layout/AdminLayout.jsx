import { motion } from 'framer-motion';
import { AdminProvider } from '@/Components/Admin/Providers/AdminProvider';
import Sidebar from '@/Components/Admin/Layout/Sidebar';
import MobileSidebar from '@/Components/Admin/Layout/MobileSidebar';
import Navbar from '@/Components/Admin/Layout/Navbar';
import { useAdmin } from '@/Components/Admin/Providers/AdminProvider';

function AdminLayoutInner({ children }) {
  const { sidebar, isMobile } = useAdmin();
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      {isMobile && sidebar.isOpen && <MobileSidebar onClose={sidebar.close} />}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 p-4 lg:p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
}
