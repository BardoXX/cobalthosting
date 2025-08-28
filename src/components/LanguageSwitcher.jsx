import React from 'react';
import { useConfig } from '../context/ConfigContext';

const LanguageSwitcher = ({ className = '' }) => {
  const { locale, setLocale, locales } = useConfig();

  const handleChange = (e) => {
    const newLocale = e.target.value;
    setLocale(newLocale);
    // In a real app, you might want to save this preference
    localStorage.setItem('preferredLocale', newLocale);
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="language-select" className="sr-only">
        Select language
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={handleChange}
        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white"
        aria-label="Select language"
      >
        {Object.entries(locales).map(([code, { name, flag }]) => (
          <option key={code} value={code}>
            {flag} {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
