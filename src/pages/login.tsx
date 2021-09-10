import React from 'react';
import Auth from '../components/Auth';
import Layout from '../components/Layout';

const Login: React.FC = () => {
  return (
    <Layout title="ログイン">
      <Auth></Auth>
    </Layout>
  );
};

export default Login;
