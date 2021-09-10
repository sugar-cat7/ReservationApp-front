import React from 'react';
import Auth from '../components/Templates/Auth';
import Layout from '../components/Templates/Layout';

const Login: React.FC = () => {
  return (
    <Layout title="ログイン">
      <Auth></Auth>
    </Layout>
  );
};

export default Login;
