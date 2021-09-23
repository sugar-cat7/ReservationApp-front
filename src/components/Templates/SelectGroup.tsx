import Button from '../Atoms/Button';
import { useRouter } from 'next/router';
import { useUserOrg } from '../../hooks/useUserOrg';
import { useState } from 'react';
import Modal from '../Atoms/Modal';
import SearchBox from '../Organiams/SearchBox';
import Input from '../Atoms/Input';
import api from '../../utils/fetch';
import Loading from '../Atoms/Loading';
import Avatar from '@mui/material/Avatar';
import { Icon, iconMap } from '../Icon/Icon';
import PaginatedList from '../Organiams/PaginatedList';
import OrgListItem from '../Modules/OrgListItem';

type orgProps = {
  id: number;
  name: string;
  public: boolean;
  description: string;
  rule: string;
  image_url: keyof typeof iconMap;
};

const SelectGroup: React.FC = () => {
  const router = useRouter();
  const { organizations, isLoading } = useUserOrg();
  const [searchedOrg, setSearchedOrg] = useState('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isShowOrgList, isSetShowOrgList] = useState<boolean>(true);
  const [selectedOrg, setSelectedOrg] = useState({ id: 0, name: '', rule: '' });
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
    return <Loading />;
  }
  let userOrgId: number[] | undefined;
  if (organizations) {
    userOrgId = organizations.map(({ id }) => id);
  }

  return (
    <>
      <div className="absolute top-20">
        <div>追加したいグループを検索</div>
        <SearchBox setModal={() => setShowModal(true)} setSearchedOrg={setSearchedOrg} />
      </div>

      {organizations.length > 0 ? (
        <div className="absolute top-44 h-4/6 overflow-y-auto">
          <div>参加しているグループ</div>
          {organizations.map(({ id, name, description, image_url }: orgProps) => (
            <div
              className="max-w-md mx-auto bg-white rounded-xl  shadow-md overflow-hidden md:max-w-2xl  hover:bg-gray hover:shadow-lg hover:border-transparent mb-4"
              onClick={() => {
                router.push({
                  pathname: '/calendar/[orgId]',
                  query: { orgId: id },
                  hash: '#month',
                });
              }}
              key={id}
            >
              <div className="md:flex">
                <div className="p-8 flex items-center gap-5">
                  {image_url ? (
                    <div className="rounded-full border border-black justify-content">
                      <Icon name={image_url} className="w-6 h-6 m-2" />
                    </div>
                  ) : (
                    <Avatar>{name[0]}</Avatar>
                  )}
                  <div className="tracking-wide text-sm text-indigo-500 font-semibold">
                    グループ: {name}
                    <div className="text-xs text-gray-500">{description}</div>
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
          isShowOrgList
            ? '検索結果'
            : `${selectedOrg.name}${
                userOrgId?.includes(selectedOrg.id) ? 'にすでに参加しています' : 'に参加する？'
              }`
        }
        showModal={showModal}
        onClickNo={() => {
          setShowModal(false);
          isSetShowOrgList(true);
        }}
      >
        {/* ページネーション & 別ファイルに分けても良さそう */}
        {isShowOrgList ? (
          <PaginatedList
            itemPerPage={5}
            apiPath={`/api/organization?search=${searchedOrg}`}
            childComponent={(props: any) => <OrgListItem {...props} />}
            onClickItem={(s: any) => {
              isSetShowOrgList(false);
              setSelectedOrg({ id: s.id, name: s.name, rule: s.rule });
            }}
          />
        ) : (
          <>
            {userOrgId?.includes(selectedOrg.id) ? (
              <div></div>
            ) : (
              <form className="ml-8 mr-8 mb-8 space-y-6" onSubmit={registerGroup}>
                <div className="w-48 sm:w-96 break-words">[ルール] {selectedOrg.rule}</div>
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
