import React from 'react';
import Button from '../components/Atoms/Button';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();
  return (
    // <Layout title="ようこそ">
    <>
      <h1>後で実装予定</h1>
      <Button
        onClick={() => {
          router.push('/login');
        }}
      >
        ログインページへ
      </Button>
    </>
    // </Layout>
  );
};

export default Home;
