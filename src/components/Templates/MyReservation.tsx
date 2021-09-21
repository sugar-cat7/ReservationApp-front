import { PencilIcon } from '@heroicons/react/solid';
import { XCircleIcon } from '@heroicons/react/solid';
import Modal from '../Atoms/Modal';
import { useState } from 'react';
import DateAndTimePickers from '../Organiams/DateAndTimePickers';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useUserOrg } from '../../hooks/useUserOrg';
import api from '../../utils/fetch';
import { getDateJPFull } from '../../utils/selectedDateConverter';
import Loading from '../Atoms/Loading';
import DetailReservation from '../Organiams/DetailReservation';

type Props = {
  myReservations: {
    created_at: string;
    end_time: string;
    id: number;
    numbers: number;
    space_id: number;
    start_time: string;
    space_name: string;
    updated_at: string;
    organization_id: string;
    organization_name: string;
    memo: string;
    users: number[];
  }[];
};

//色々冗長すぎるのでまとめる
const MyReservation: React.FC<Props> = ({ myReservations }) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [orgId, setOrgId] = useState<string>('');
  const [spaceId, setSpaceId] = useState<number>(0);
  const [rvId, setRvId] = useState<number>(0);
  // const [rvMemo, setRvMemo] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [groupId, setGroupId] = useState<number | string>(0);
  const { organizations, isLoading } = useUserOrg();
  const [data, setData] = useState({
    memo: '',
    orgName: '',
    spaceName: '',
    startTime: '',
    endTime: '',
    users: [{ id: 0, name: '', kana: '' }],
  });

  if (isLoading) {
    return <Loading />;
  }

  const deleteReservation = async (orgId: string, spaceId: number, rvId: number) => {
    await api
      .delete(`/api/organization/${orgId}/space/${spaceId}/reservation/${rvId}`)
      .then(() => {
        alert('削除しました');
        setShowDeleteModal(false);
      })
      .catch((err) => alert(err));
  };

  const onChangeProps = (
    orgId: string,
    spaceId: number,
    rvId: number,
    isEdit: boolean,
    start_time?: string,
    end_time?: string,
    // memo?: string,
  ) => {
    if (isEdit) {
      const [s] = start_time!.split('+');
      const [e] = end_time!.split('+');
      setShowEditModal(true);
      setStartDate(s);
      setEndDate(e);
    } else {
      setShowDeleteModal(true);
    }
    setOrgId(orgId);
    setSpaceId(spaceId);
    setRvId(rvId);
    // setRvMemo(memo!);
  };
  let filteredMyReservations: Props['myReservations'];
  if (groupId === 0) {
    filteredMyReservations = myReservations;
  } else {
    filteredMyReservations = myReservations.filter((m) => m.organization_id === groupId);
  }
  console.log(myReservations);

  const toggleHandler = async (r: Props['myReservations'][0]) => {
    await api.get(`/api/organization/${r.organization_id}`).then((data) => {
      console.log('data', data);
      setData({
        memo: r.memo,
        orgName: r.organization_name,
        spaceName: r.space_name,
        startTime: r.start_time,
        endTime: r.end_time,
        users: data.users.filter((u: Props['myReservations'][0]) => r.users.includes(u.id)),
      });
      setShowDetailModal(true);
    });
  };

  return (
    <>
      <div className="absolute top-20 flex items-center">
        <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 250 }}>
          <InputLabel id="select-group-label">予約の絞り込み</InputLabel>
          <Select
            labelId="select-group-label"
            id="select-group-label"
            value={groupId}
            label="group"
            onChange={(e) => {
              setGroupId(e.target.value);
            }}
          >
            <MenuItem value={0}>
              <em>全て</em>
            </MenuItem>
            {organizations &&
              organizations.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <div className="absolute top-44 h-4/6 overflow-y-auto">
        <div className="mb-2">※複数人での予約の場合、編集はできません</div>
        {filteredMyReservations.map((r) => (
          <div
            key={r.id}
            className="flex w-80 border-b-2 border-gray-400 justify-between items-center mb-2 sm:w-96"
          >
            <div onClick={() => toggleHandler(r)}>
              {r.organization_name}
              <div className="text-gray-400">
                <div>場所:{r.space_name}</div>
                <div>時間:{getDateJPFull(r.start_time)}</div>
              </div>
            </div>
            <div className="flex">
              {r.users && r.users.length < 2 && (
                <PencilIcon
                  className="h-7 w-7"
                  onClick={() =>
                    onChangeProps(
                      r.organization_id,
                      r.space_id,
                      r.id,
                      true,
                      r.start_time,
                      r.end_time,
                      // r.memo,
                    )
                  }
                />
              )}
              {/* TODO orgId変える */}
              <XCircleIcon
                className="h-7 w-7"
                onClick={() => onChangeProps(r.organization_id, r.space_id, r.id, false)}
              />
            </div>
          </div>
        ))}
        <Modal
          data="予定を削除しますか？"
          showModal={showDeleteModal}
          onClickNo={() => setShowDeleteModal(false)}
          onClickYes={() => deleteReservation(orgId, spaceId, rvId)}
        />
        <Modal
          data="予定を変更しますか？"
          showModal={showEditModal}
          onClickNo={() => setShowEditModal(false)}
        >
          <DateAndTimePickers
            startDate={startDate}
            endDate={endDate}
            orgId={orgId}
            rSpaceId={spaceId}
            reservationId={rvId}
            isEdit={true}
            // users={users}
          />
        </Modal>
        <Modal
          data="詳細情報"
          showModal={showDetailModal}
          onClickNo={() => setShowDetailModal(false)}
        >
          <DetailReservation {...data} />
        </Modal>
      </div>
    </>
  );
};

export default MyReservation;
