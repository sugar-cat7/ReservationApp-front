import { useState } from 'react';
import Input from '../Atoms/Input';
import Button from '../Atoms/Button';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import api from '../../utils/fetch';
import UpLoadTest from '../Organiams/UpLoad';

const GroupRegister: React.FC = () => {
  const [group, setGroup] = useState({
    groupName: '',
    description: '',
    groupPassword: '',
    isPublic: false,
    imageUrl: '',
  });
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return <div>ログインし直してください</div>;
  }

  const registerGroup = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .post(`/api/organization/`, {
        name: group.groupName,
        password: group.groupPassword,
        description: group.description,
      })
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
            placeholder="グループ名"
            value={group.groupName}
            onChange={(e) => {
              setGroup({ ...group, groupName: e.target.value });
            }}
          />
          <Input
            name="groupPassword"
            type="password"
            placeholder="パスワード"
            value={group.groupPassword}
            onChange={(e) => {
              setGroup({ ...group, groupPassword: e.target.value });
            }}
            PassFlag
          />
          <Input
            name="description"
            type="text"
            placeholder="ひとこと、メモ"
            value={group.description}
            onChange={(e) => {
              setGroup({ ...group, description: e.target.value });
            }}
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="public"
            name="public"
            className="mr-2"
            onClick={() => setGroup({ ...group, isPublic: !group.isPublic })}
          />
          このグループを一般に公開しますか？
          <br />
          ※管理画面から変更できます
        </div>
        {/* 作成中 */}
        {process.env.NODE_ENV === 'development' && <UpLoadTest {...{ group, setGroup }} />}
        <Button>追加する</Button>
      </form>
    </div>
  );
};

export default GroupRegister;
