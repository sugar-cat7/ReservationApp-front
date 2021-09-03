import { PencilIcon } from '@heroicons/react/solid';
import { XCircleIcon } from '@heroicons/react/solid';
import Modal from '../utils/Modal';
import { useState } from 'react';
import DateAndTimePickers from '../utils/DateAndTimePickers';

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
    organization_id: number;
    organization_name: string;
  }[];
};

const MyReservation: React.FC<Props> = ({ myReservations }) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [orgId, setOrgId] = useState<number>(0);
  const [spaceId, setSpaceId] = useState<number>(0);
  const [rvId, setRvId] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const getDateJP = (date: string) => {
    const [ymd, time] = date.split('T');
    const [y, m, d] = ymd.split('-');
    const [t] = time.split('.');
    const [hour, minutes] = t.split(':');
    const result = y + '年' + m + '月' + d + '日 ' + hour + ':' + minutes;
    return result;
  };

  const deleteReservation = async (orgId: number, spaceId: number, rvId: number) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/api/organization/${orgId}/space/${spaceId}/reservation/${rvId}`,
        {
          method: 'DELETE',
          // mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${sessionStorage.getItem('access_token')}`,
          },
        },
      ).then((res) => {
        if (res.status === 401) {
          throw 'authentication failed';
        } else if (res.ok) {
          alert('予約を削除しました');
          setShowDeleteModal(false);
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  const onChangeProps = (
    orgId: number,
    spaceId: number,
    rvId: number,
    isEdit: boolean,
    start_time?: string,
    end_time?: string,
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
  };

  return (
    <>
      {myReservations.map((r) => (
        <div
          key={r.id}
          className="flex w-80 border-b-2 border-gray-400 justify-between items-center mb-2"
        >
          <div>
            {r.organization_name}
            <div className="text-gray-400">
              <div>場所:{r.space_name}</div>
              <div>時間:{getDateJP(r.start_time)}</div>
            </div>
          </div>
          <div className="flex">
            <PencilIcon
              className="h-7 w-7"
              onClick={() =>
                onChangeProps(r.organization_id, r.space_id, r.id, true, r.start_time, r.end_time)
              }
            />
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
          startLabel="開始時間"
          endLabel="終了時間"
          orgId={orgId}
          spaceId={spaceId}
          reservationId={rvId}
          isEdit={true}
          // users={users}
        />
      </Modal>
    </>
  );
};

export default MyReservation;