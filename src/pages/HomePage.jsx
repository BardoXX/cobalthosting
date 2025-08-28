import React from 'react';
import { useConfig } from '../context/ConfigContext';
import PageRenderer from '../components/PageRenderer';

const HomePage = () => {
  const { t } = useConfig();
  
  return <PageRenderer pageKey="home" />;
};

export default HomePage;
