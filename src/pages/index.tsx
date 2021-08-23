import React from 'react';
import Auth from '../components/Auth';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout title="login page">
      <Auth></Auth>
    </Layout>
  );
};

export default Home;
