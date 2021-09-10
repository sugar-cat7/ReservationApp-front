import { useState } from 'react';
import Input from '../Atoms/Input';
import Button from '../Atoms/Button';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import api from '../../utils/fetch';

const RegisterSpace: React.FC = () => {
  const [spaceName, setSpaceName] = useState<string>('');
  const [spaceCapacity, setSpaceCapacity] = useState<string>('');
  const [isAddSpace, setIsAddSpace] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useAuth();
  const { orgId } = router.query;

  if (!user) {
    return <div>ログインし直してください</div>;
  }

  const registerSpace = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .post(`/api/organization/${orgId}/space`, { name: spaceName, capacity: spaceCapacity })
      .then(() => {
        alert('スペースを追加しました');
        setIsAddSpace(true);
        setSpaceName('');
        setSpaceCapacity('');
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="max-w-md w-full space-y-2 sm:w-screen">
      <h1>1グループにつき複数のスペースを登録することができます。</h1>
      <div>(例) </div>
      <div>グループ:テニスサークル</div>
      <div>場所:テニスコートA, テニスコートB</div>
      <form className="mt-8 space-y-6" onSubmit={registerSpace}>
        <div className="rounded-md shadow-sm -space-y-px">
          <Input
            name="spaceName"
            type="text"
            autoComplete="spaceName"
            placeholder="スペース名"
            value={spaceName}
            onChange={(e) => {
              setSpaceName(e.target.value);
            }}
          />
          <Input
            name="spaceCapacity"
            type="number"
            autoComplete="spaceCapacity"
            placeholder="スペースの制限人数(半角数字)"
            value={spaceCapacity}
            onChange={(e) => {
              setSpaceCapacity(e.target.value);
            }}
          />
        </div>
        <Button>追加する</Button>
      </form>
      {isAddSpace && (
        <Button
          onClick={() => {
            router.push('/select-group');
          }}
        >
          グループへ
        </Button>
      )}
    </div>
  );
};

export default RegisterSpace;