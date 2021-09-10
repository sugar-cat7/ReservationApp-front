import { useState } from 'react';
import Input from '../utils/Input';
import Button from '../utils/Button';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
// import { useCookies } from 'react-cookie';

const GroupRegister: React.FC = () => {
  const [groupName, setGroupName] = useState<string>('');
  const [groupPassword, setGroupPassword] = useState<string>('');
  const router = useRouter();
  const { user } = useAuth();
  // const [cookie] = useCookies(['access_token']);

  if (!user) {
    return <div>ログインし直してください</div>;
  }

  const registerGroup = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/organization/`, {
        method: 'POST',
        body: JSON.stringify({ name: groupName, password: groupPassword }),
        // mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${sessionStorage.getItem('access_token')}`,
        },
      })
        .then((res) => {
          if (res.status === 401) {
            throw 'authentication failed';
          }
          if (res.status === 500) {
            throw 'Internal Error!';
          }
          if (res.ok) {
            const resJson = res.json();
            return resJson;
          }
        })
        .then((data) => {
          alert('グループを追加しました');
          router.push({
            pathname: '/register-space/[orgId]',
            query: { orgId: data.id },
          });
        });
    } catch (err) {
      alert(err);
    }
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
