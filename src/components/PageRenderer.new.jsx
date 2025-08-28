import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useConfig } from '../context/ConfigContext';

// Error boundary for component loading
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-200 bg-red-50 rounded-md">
          <h3 className="font-medium text-red-800">Error loading component</h3>
          <p className="text-sm text-red-600">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Component to dynamically load a component
const DynamicComponent = ({ componentName, ...props }) => {
  // Import all components at the top level
  const components = {
    Navbar: React.lazy(() => import('./Navbar')),
    Hero: React.lazy(() => import('./Hero')),
    Features: React.lazy(() => import('./Features')),
    Testimonials: React.lazy(() => import('./Testimonials')),
    CTA: React.lazy(() => import('./CTA')),
    Footer: React.lazy(() => import('./Footer')),
  };

  const Component = components[componentName];
  
  if (!Component) {
    return (
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Component <span className="font-medium">{componentName}</span> not found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="p-4 border border-gray-200 rounded-md animate-pulse">
          Loading {componentName}...
        </div>
      }>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

// Main PageRenderer component
const PageRenderer = ({ pageKey = 'home', ...props }) => {
  const { config } = useConfig();
  
  if (!config?.pages?.[pageKey]) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 rounded-md">
        <h3 className="font-medium text-red-800">Page not found</h3>
        <p className="text-sm text-red-600">The requested page "{pageKey}" does not exist.</p>
      </div>
    );
  }

  const pageConfig = config.pages[pageKey];
  
  return (
    <div className="min-h-screen flex flex-col">
      {pageConfig.components.map((componentName, index) => (
        <DynamicComponent 
          key={`${componentName}-${index}`}
          componentName={componentName}
          {...props}
        />
      ))}
    </div>
  );
};

PageRenderer.propTypes = {
  pageKey: PropTypes.string,
};

PageRenderer.defaultProps = {
  pageKey: 'home',
};

export default PageRenderer;
