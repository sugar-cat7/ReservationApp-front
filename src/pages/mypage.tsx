import React from 'react';
import Layout from '../components/Templates/Layout';
import Setting from '../components/Templates/Setting';
import { useUser } from '../hooks/useUser';
import Loading from '../components/Atoms/Loading';

const MySetting: React.FC = () => {
  const { logInUser, islogInUserLoading } = useUser();
  console.log(logInUser);
  return (
    <Layout title="設定">{islogInUserLoading ? <Loading /> : <Setting user={logInUser} />}</Layout>
  );
};

export default MySetting;
