import Button from '../Atoms/Button';
import { useRouter } from 'next/router';
import { useUserOrg } from '../../hooks/useUserOrg';
import { useState } from 'react';
import Modal from '../Atoms/Modal';
import SearchBox from '../Organiams/SearchBox';
import Input from '../Atoms/Input';
import api from '../../utils/fetch';

type orgProps = {
  id: number;
  name: string;
};

//TODO ここでグループを選ぶときに,そのグループのユーザー情報をcontextに持つようにする
const SelectGroup: React.FC = () => {
  const router = useRouter();
  const { organizations, isLoading } = useUserOrg();
  const [searchedOrg, setSearchedOrg] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showOrgList, setShowOrgList] = useState<boolean>(true);
  const [selectedOrg, setSelectedOrg] = useState({ id: 0, name: '' });
  const [orgPassword, setOrgPassword] = useState<string>('');

  const registerGroup = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .post(`/api/user/organization/${selectedOrg.id}`, { password: orgPassword })
      .then(() => {
        alert('予定を追加しました');
        setShowModal(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (isLoading) {
    return <div>loding</div>;
  }
  let userOrgId: number[] | undefined;
  if (organizations) {
    userOrgId = organizations.map(({ id }) => id);
  }
  console.log(organizations);

  //TODO 登録されてるグループない場合の処理追加と普通に表示するように分ける
  return (
    <>
      <div className="absolute top-20">
        <div>追加したいグループを検索</div>
        <SearchBox setModal={() => setShowModal(true)} setSearchedOrg={setSearchedOrg} />
      </div>

      {organizations ? (
        <div className="absolute top-44 h-4/6 overflow-y-auto">
          <div>参加しているグループ</div>
          {organizations.map(({ id, name }: orgProps) => (
            <div
              className="max-w-md mx-auto bg-white rounded-xl  shadow-md overflow-hidden md:max-w-2xl  hover:bg-gray hover:shadow-lg hover:border-transparent mb-4 sm:w-screen"
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
                  <div className="tracking-wide text-sm text-indigo-500 font-semibold">
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
          グループ登録画面へ
        </Button>
      )}
      <Modal
        data={
          showOrgList
            ? '検索結果'
            : `${selectedOrg.name}${
                userOrgId?.includes(selectedOrg.id) ? 'にすでに参加しています' : 'に参加する？'
              }`
        }
        showModal={showModal}
        onClickNo={() => {
          setShowModal(false);
          setShowOrgList(true);
        }}
      >
        {showOrgList ? (
          searchedOrg.map(({ id, name }: orgProps) => (
            <div
              className={`${
                !userOrgId?.includes(id) ? 'bg-white' : 'bg-gray-200'
              } w-72 mx-auto rounded-xl  shadow-md overflow-hidden md:max-w-2xl  hover:bg-gray hover:shadow-lg hover:border-transparent mr-4 ml-4 mb-4`}
              key={id}
              onClick={() => {
                setShowOrgList(false);
                setSelectedOrg({ id: id, name: name });
              }}
            >
              <div className="md:flex">
                <div className="p-2">
                  <div className="tracking-wide text-sm text-indigo-500 font-semibold">
                    グループ: {name}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            {userOrgId?.includes(selectedOrg.id) ? (
              <div></div>
            ) : (
              <form className="ml-8 mr-8 mb-8 space-y-6" onSubmit={registerGroup}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <Input
                    name="orgPassword"
                    type="password"
                    autoComplete="orgPassword"
                    placeholder="パスワード"
                    value={orgPassword}
                    onChange={(e) => {
                      setOrgPassword(e.target.value);
                    }}
                    PassFlag
                  />
                </div>
                <Button>参加する</Button>
              </form>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default SelectGroup;
