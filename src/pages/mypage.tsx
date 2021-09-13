import React from 'react';
import Layout from '../components/Templates/Layout';
import Setting from '../components/Templates/Setting';
import { useUser } from '../hooks/useUser';
import Loading from '../components/Atoms/Loading';

const Mysetting: React.FC = () => {
  const { user, isLoading } = useUser();

  return <Layout title="設定">{isLoading ? <Loading /> : <Setting user={user} />}</Layout>;
};

export default Mysetting;
