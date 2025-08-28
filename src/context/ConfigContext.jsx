import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import config, { getConfig } from '../../config/site.config';

// Create context
const ConfigContext = createContext();

// Custom hook to use config
const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

// Helper to get subdomain from hostname
const getSubdomain = (hostname) => {
  if (typeof window === 'undefined') return '';
  const parts = hostname.split('.');
  return parts.length > 2 ? parts[0] : '';
};

// Main provider component
const ConfigProvider = ({ children, initialLocale, initialCurrency }) => {
  const [locale, setLocale] = useState(initialLocale || config.siteMeta.defaultLocale);
  const [currency, setCurrency] = useState(initialCurrency || config.siteMeta.defaultCurrency);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get the current configuration based on host and state
  const getCurrentConfig = () => {
    try {
      const host = typeof window !== 'undefined' ? window.location.hostname : '';
      return getConfig(host);
    } catch (err) {
      console.error('Error loading config:', err);
      setError(err);
      return getConfig(); // Fallback to base config
    }
  };

  const [currentConfig, setCurrentConfig] = useState(() => {
    try {
      const host = typeof window !== 'undefined' ? window.location.hostname : '';
      return getConfig(host);
    } catch (err) {
      console.error('Error loading config:', err);
      setError(err);
      return config; // Fallback to base config
    }
  });

  // Use the i18n translation hook
  const { t: i18nT, i18n } = useTranslation();

  // Change language when locale changes
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Format currency value based on current currency
  const formatCurrency = (value) => {
    const formatter = currentConfig.currencies[currency]?.format;
    return formatter ? formatter(value) : value;
  };

  // Wrapper around i18n.t to maintain backward compatibility
  const t = (key, defaultValue = '', variables = {}) => {
    const translation = i18nT(key, { defaultValue, ...variables });
    return translation || defaultValue || key;
  };

  // Context value
  const contextValue = {
    ...currentConfig,
    locale,
    setLocale,
    currency,
    setCurrency,
    formatCurrency,
    t,
    isLoading,
    error,
    getCurrentConfig,
  };

  return (
    <ConfigContext.Provider value={contextValue}>
      {!isLoading && !error ? children : (
        <div className="flex items-center justify-center min-h-screen">
          {isLoading ? 'Loading...' : `Error: ${error?.message}`}
        </div>
      )}
    </ConfigContext.Provider>
  );
};

export { ConfigProvider, useConfig };
