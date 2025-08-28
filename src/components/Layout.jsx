import React from 'react';
import { useConfig } from '../context/ConfigContext';
import PageRenderer from './PageRenderer';

const Layout = ({ children }) => {
  const { t } = useConfig();
  
  return (
    <div className="flex flex-col min-h-screen">
      <PageRenderer componentName="Navbar" />
      <main className="flex-grow">
        {children}
      </main>
      <PageRenderer componentName="Footer" />
    </div>
  );
};

export default Layout;
