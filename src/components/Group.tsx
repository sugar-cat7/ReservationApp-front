import Button from '../utils/Button';
import { useRouter } from 'next/router';
const Group: React.FC = () => {
  const router = useRouter();
  //TODO 登録されてるグループない場合の処理追加と普通に表示するように分ける
  return (
    <div>
      一覧画面
      <Button
        onClick={() => {
          router.push('/register-group');
        }}
      >
        登録画面へ
      </Button>
      <Button
        onClick={() => {
          router.push('/calendar');
        }}
      >
        カレンダーへ
      </Button>
    </div>
  );
};

export default Group;
