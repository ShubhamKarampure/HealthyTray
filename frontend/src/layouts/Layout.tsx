import React from 'react';
import Sidebar from '@/components/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-[240px]">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <main className="overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
