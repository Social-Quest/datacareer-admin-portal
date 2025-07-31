
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const HEADER_HEIGHT = 'h-16'; // Header height (4rem)

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div>
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen z-30 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <Sidebar onCollapsedChange={setSidebarCollapsed} />
      </div>
      {/* Header */}
      <div className={`fixed top-0 ${HEADER_HEIGHT} z-20 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'left-16' : 'left-64'} right-0`}>
        <Header />
      </div>
      {/* Main Content */}
      <main
        className={`mt-16 p-6 md:p-8 bg-[#F5F7FB] h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
