import React, { useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { motion, AnimatePresence } from 'framer-motion';
import PageRenderer from './PageRenderer';

const Layout = ({ children }) => {
  const { t, locale } = useConfig();
  
  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [locale]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white shadow-sm"
      >
        <PageRenderer componentName="Navbar" />
      </motion.header>
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={locale}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-800 text-white"
      >
        <PageRenderer componentName="Footer" />
      </motion.footer>
    </div>
  );
};

export default Layout;
