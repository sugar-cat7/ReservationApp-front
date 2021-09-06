import Button from '../utils/Button';
import { useRouter } from 'next/router';
import { useUserOrg } from '../hooks/useUserOrg';

type orgProps = {
  id: number;
  name: string;
};

//TODO ここでグループを選ぶときに,そのグループのユーザー情報をcontextに持つようにする
const SelectGroup: React.FC = () => {
  const router = useRouter();
  const { organizations, isLoading } = useUserOrg();
  if (isLoading) {
    return <div>loding</div>;
  }
  //TODO 登録されてるグループない場合の処理追加と普通に表示するように分ける
  return (
    <>
      {organizations ? (
        <div>
          {organizations.map(({ id, name }: orgProps) => (
            <div
              className="max-w-md mx-auto bg-white rounded-xl  shadow-md overflow-hidden md:max-w-2xl  hover:bg-gray hover:shadow-lg hover:border-transparent mb-4"
              onClick={() => {
                router.push({
                  pathname: '/calendar/[orgId]',
                  query: { orgId: id },
                });
              }}
              key={id}
            >
              <div className="md:flex">
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    グループ: {name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Button
          onClick={() => {
            router.push('/register-group');
          }}
        >
          登録画面へ
        </Button>
      )}
    </>
  );
};

export default SelectGroup;
