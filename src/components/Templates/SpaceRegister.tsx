import { useState } from 'react';
import Input from '../Atoms/Input';
import Button from '../Atoms/Button';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import api from '../../utils/fetch';

const RegisterSpace: React.FC = () => {
  const [space, setSpace] = useState({
    name: '',
    capacity: '',
    description: '',
    color: '',
  });
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
      .post(`/api/organization/${orgId}/space`, {
        name: space.name,
        capacity: space.capacity,
        description: space.description,
        color: space.color,
      })
      .then(() => {
        alert('スペースを追加しました');
        setIsAddSpace(true);
        setSpace({ name: '', capacity: '', description: '', color: '' });
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
            value={space.name}
            onChange={(e) => {
              setSpace({ ...space, name: e.target.value });
            }}
          />
          <Input
            name="spaceCapacity"
            type="number"
            autoComplete="spaceCapacity"
            placeholder="スペースの制限人数(半角数字)"
            value={space.capacity}
            onChange={(e) => {
              setSpace({ ...space, capacity: e.target.value });
            }}
          />
          <Input
            name="description"
            type="text"
            placeholder="ひとこと、メモ"
            value={space.description}
            onChange={(e) => {
              setSpace({ ...space, description: e.target.value });
            }}
          />
        </div>
        <div className="flex items-center">
          <div>スペースの予約を表示色を選べます</div>
          <input
            type="color"
            onChange={(e) => setSpace({ ...space, color: e.target.value })}
            required
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
