import React from 'react';
import { useConfig } from '../context/ConfigContext';

const CurrencySwitcher = ({ className = '' }) => {
  const { currency, setCurrency, currencies } = useConfig();

  const handleChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    // In a real app, you might want to save this preference
    localStorage.setItem('preferredCurrency', newCurrency);
  };

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="currency-select" className="sr-only">
        Select currency
      </label>
      <select
        id="currency-select"
        value={currency}
        onChange={handleChange}
        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white"
        aria-label="Select currency"
      >
        {Object.entries(currencies).map(([code, { symbol }]) => (
          <option key={code} value={code}>
            {code} ({symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySwitcher;
