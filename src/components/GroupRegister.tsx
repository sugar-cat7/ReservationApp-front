import { useState } from 'react';
import Input from '../utils/Input';
import Button from '../utils/Button';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const GroupRegister: React.FC = () => {
  const [groupName, setGroupName] = useState<string>('');
  const router = useRouter();
  const { user } = useAuth();
  const [cookie] = useCookies(['access_token']);

  if (!user) {
    return <div>ログインし直してください</div>;
  }

  const registerGroup = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/organization/`, {
        method: 'POST',
        body: JSON.stringify({ name: groupName, email: user.email, password: user.passwordDigest }),
        // mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${cookie.access_token}`,
        },
      }).then((res) => {
        if (res.status === 401) {
          throw 'authentication failed';
        } else if (res.ok) {
          alert('グループを追加しました');
          router.push('/select-group');
        }
      });
    } catch {
      (err: string) => {
        alert(err);
      };
    }
  };

  return (
    <>
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
        </div>
        <Button>追加する</Button>
      </form>
    </>
  );
};

export default GroupRegister;
