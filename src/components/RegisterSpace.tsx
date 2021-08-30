import { useState } from 'react';
import Input from '../utils/Input';
import Button from '../utils/Button';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const RegisterSpace: React.FC = () => {
  const [spaceName, setSpaceName] = useState<string>('');
  const [spaceCapacity, setSpaceCapacity] = useState<string>('');
  const router = useRouter();
  const { user } = useAuth();
  const { orgId } = router.query;

  if (!user) {
    return <div>ログインし直してください</div>;
  }

  const registerSpace = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/api/organization/${orgId}/space`, {
        method: 'POST',
        body: JSON.stringify({ name: spaceName, capacity: spaceCapacity }),
        // mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${sessionStorage.getItem('access_token')}`,
        },
      }).then((res) => {
        if (res.status === 401) {
          throw 'authentication failed';
        } else if (res.ok) {
          alert('スペースを追加しました');
          router.push('/select-group');
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
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
    </div>
  );
};

export default RegisterSpace;
