// Base configuration for Cobalt Hosting
// This is the single source of truth for site configuration

const config = {
  // Site metadata
  siteMeta: {
    brand: 'Cobalt Hosting',
    defaultLocale: 'nl',
    defaultCurrency: 'EUR',
    urls: {
      production: 'https://cobalthosting.be',
      staging: 'https://staging.cobalthosting.be',
      development: 'http://localhost:3000'
    },
    features: {
      free: ['basic_support', 'email'],
      pro: ['priority_support', 'email', 'phone', 'slack'],
      enterprise: ['24_7_support', 'dedicated_manager', 'slack', 'phone']
    }
  },

  // Available locales with display names
  locales: {
    nl: { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    en: { code: 'en', name: 'English', flag: '🇬🇧' },
    fr: { code: 'fr', name: 'Français', flag: '🇫🇷' },
    de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  },

  // Currency configuration
  currencies: {
    EUR: {
      symbol: '€',
      format: (value) => `€${value.toFixed(2).replace(/\./g, ',')}`
    },
    USD: {
      symbol: '$',
      format: (value) => `$${value.toFixed(2)}`
    },
    GBP: {
      symbol: '£',
      format: (value) => `£${value.toFixed(2)}`
    }
  },

  // Theme configuration
  theme: {
    colors: {
      primary: '#2563eb',
      secondary: '#4f46e5',
      accent: '#7c3aed',
      background: '#f8fafc',
      text: '#1e293b'
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  },

  // Component registry - maps component keys to actual components
  componentMap: {
    // Will be populated with dynamic imports
  },

  // Page configurations
  pages: {
    home: {
      layout: 'default',
      components: ['Navbar', 'Hero', 'Features', 'Testimonials', 'CTA', 'Footer']
    },
    pricing: {
      layout: 'pricing',
      components: ['Navbar', 'PricingTable', 'FeatureComparison', 'Faq', 'Footer']
    },
    about: {
      layout: 'default',
      components: ['Navbar', 'PageHeader', 'Team', 'Values', 'CTA', 'Footer']
    }
  },

  // Content and translations
  content: {
    // Will be loaded from separate JSON files per locale
  },

  // Subdomain/route specific overrides
  overrides: {
    // Example: 'my.cobalthosting.be': {
    //   siteMeta: {
    //     brand: 'My Cobalt Hosting',
    //     defaultLocale: 'nl'
    //   },
    //   pages: {
    //     home: {
    //       components: ['CustomHero', 'Features', 'Pricing']
    //     }
    //   }
    // }
  }
};

// Deep merge function for configuration overrides
const deepMerge = (target, source) => {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
};

const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
};

// Apply environment-specific overrides
const getConfig = (host = '') => {
  let envConfig = {};
  
  // Apply subdomain overrides if they exist
  if (host && config.overrides[host]) {
    envConfig = deepMerge(envConfig, config.overrides[host]);
  }
  
  // Apply environment-specific overrides
  const env = process.env.NODE_ENV || 'development';
  if (config[env]) {
    envConfig = deepMerge(envConfig, config[env]);
  }
  
  return deepMerge(config, envConfig);
};

// Export the config as default and getConfig as a named export
export { config as default, getConfig };
