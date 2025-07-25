
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const SIDEBAR_WIDTH = 'w-64'; // Sidebar width (16rem)
const HEADER_HEIGHT = 'h-16'; // Header height (4rem)

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 ${SIDEBAR_WIDTH} h-screen z-30`}>
        <Sidebar />
      </div>
      {/* Header */}
      <div className={`fixed top-0 left-64 right-0 ${HEADER_HEIGHT} z-20`}>
        <Header />
      </div>
      {/* Main Content */}
      <main
        className={`ml-64 mt-16 p-6 md:p-8 bg-[#F5F7FB] h-[calc(100vh-4rem)] overflow-y-auto`}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
