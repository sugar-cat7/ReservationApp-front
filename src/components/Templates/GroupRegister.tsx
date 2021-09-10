import { useState } from 'react';
import Input from '../Atoms/Input';
import Button from '../Atoms/Button';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import api from '../../utils/fetch';

const GroupRegister: React.FC = () => {
  const [groupName, setGroupName] = useState<string>('');
  const [groupPassword, setGroupPassword] = useState<string>('');
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return <div>ログインし直してください</div>;
  }

  const registerGroup = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .post(`/api/organization/`, { name: groupName, password: groupPassword })
      .then((data) => {
        alert('グループを追加しました');
        router.push({
          pathname: '/register-space/[orgId]',
          query: { orgId: data.id },
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="max-w-md w-full space-y-8 sm:w-screen">
      <div>グループを追加しよう！</div>
      <form className="mt-8 space-y-6" onSubmit={registerGroup}>
        <div className="rounded-md shadow-sm -space-y-px">
          <Input
            name="groupName"
            type="text"
            autoComplete="groupName"
            placeholder="グループ名"
            value={groupName}
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          />
          <Input
            name="groupPassword"
            type="password"
            autoComplete="groupPassword"
            placeholder="パスワード"
            value={groupPassword}
            onChange={(e) => {
              setGroupPassword(e.target.value);
            }}
            PassFlag
          />
        </div>
        <Button>追加する</Button>
      </form>
    </div>
  );
};

export default GroupRegister;
