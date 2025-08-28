import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { Link } from 'react-router-dom';

const CTA = () => {
  const { t, theme } = useConfig();
  
  return (
    <section className="bg-primary-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">{t('cta.title', 'Ready to get started?')}</span>
          <span className="block">{t('cta.subtitle', 'Start your free trial today.')}</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-primary-200">
          {t('cta.description', 'Join thousands of businesses that trust Cobalt Hosting for their online presence.')}
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
            >
              {t('common.cta.getStarted', 'Get Started')}
            </Link>
          </div>
          <div className="ml-3 inline-flex">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              {t('common.cta.contactSales', 'Contact Sales')}
            </Link>
          </div>
        </div>
        <p className="mt-3 text-sm text-primary-200">
          {t('cta.noCreditCard', 'No credit card required.')}{' '}
          <span className="text-white font-medium">{t('cta.freeTrial', '14-day free trial.')}</span>
        </p>
      </div>
    </section>
  );
};

export default CTA;
