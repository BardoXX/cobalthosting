import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, useConfig } from './context/ConfigContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PageRenderer from './components/PageRenderer';

// In a real app, you would load this dynamically
import { getConfig } from '../config/site.config';
const config = getConfig();

// Initialize with user preferences from localStorage if available
const getInitialState = () => {
  if (typeof window === 'undefined') {
    return {
      locale: config.siteMeta.defaultLocale,
      currency: config.siteMeta.defaultCurrency,
    };
  }

  return {
    locale: localStorage.getItem('preferredLocale') || config.siteMeta.defaultLocale,
    currency: localStorage.getItem('preferredCurrency') || config.siteMeta.defaultCurrency,
  };
};

// Custom 404 component
const NotFound = () => {
  const { t } = useConfig();
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('common.notFound.title', '404 - Page Not Found')}
        </h1>
        <p className="text-gray-600 mb-6">
          {t('common.notFound.message', 'The page you\'re looking for doesn\'t exist.')}
        </p>
        <a 
          href="/" 
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {t('common.notFound.cta', 'Back to Home')}
        </a>
      </div>
    </div>
  );
};

// Wrapper component to handle page rendering with Layout
const PageWithLayout = ({ pageKey, siteName }) => {
  const { t } = useConfig();
  
  return (
    <Layout siteName={siteName}>
      <Suspense fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse">{t('common.loading', 'Loading...')}</div>
        </div>
      }>
        <PageRenderer pageKey={pageKey} />
      </Suspense>
    </Layout>
  );
};

function App() {
  const initialState = getInitialState();
  const siteName = config.siteMeta?.brand || 'Cobalt Hosting';

  return (
    <ConfigProvider 
      initialLocale={initialState.locale}
      initialCurrency={initialState.currency}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route 
            path="/home" 
            element={
              <Layout siteName={siteName}>
                <HomePage />
              </Layout>
            } 
          />
          <Route 
            path="/pricing" 
            element={
              <PageWithLayout 
                pageKey="pricing"
                siteName={siteName}
              />
            } 
          />
          <Route 
            path="/about" 
            element={
              <PageWithLayout 
                pageKey="about"
                siteName={siteName}
              />
            } 
          />
          {/* Fallback 404 route */}
          <Route 
            path="*" 
            element={
              <Layout>
                <NotFound />
              </Layout>
            } 
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
