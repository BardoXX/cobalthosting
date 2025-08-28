import React from 'react';
import { useConfig } from '../context/ConfigContext';

const features = [
  {
    name: '99.9% Uptime',
    description: 'Our servers are monitored 24/7 to ensure maximum uptime for your websites.',
    icon: '🔄',
  },
  {
    name: 'Lightning Fast',
    description: 'Powered by SSD storage and optimized servers for the fastest loading times.',
    icon: '⚡',
  },
  {
    name: 'Secure Hosting',
    description: 'Free SSL certificates and advanced security measures to protect your data.',
    icon: '🔒',
  },
  {
    name: '24/7 Support',
    description: 'Our expert support team is available around the clock to assist you.',
    icon: '👨‍💻',
  },
];

const Features = () => {
  const { t } = useConfig();
  
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t('features.title', 'Everything you need to succeed')}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            {t('features.subtitle', 'Powerful features to help you build and grow your online presence')}
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {t(`features.${feature.name.toLowerCase().replace(/\s+/g, '')}`, feature.name)}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {t(`features.${feature.name.toLowerCase().replace(/\s+/g, '')}Desc`, feature.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
