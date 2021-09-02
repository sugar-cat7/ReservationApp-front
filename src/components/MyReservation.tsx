import { PencilIcon } from '@heroicons/react/solid';
import { XCircleIcon } from '@heroicons/react/solid';
import Modal from '../utils/Modal';
import { useState } from 'react';
type Props = {
  myReservations: {
    created_at: string;
    end_time: string;
    id: number;
    numbers: number;
    space_id: number;
    start_time: string;
    updated_at: string;
  }[];
};

const MyReservation: React.FC<Props> = ({ myReservations }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [orgId, setOrgId] = useState<number>(0);
  const [spaceId, setSpaceId] = useState<number>(0);
  const [rvId, setRvId] = useState<number>(0);

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
          setShowModal(false);
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  const onChangeProps = (orgId: number, spaceId: number, rvId: number) => {
    setShowModal(true);
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
            {r.id}グループ名
            <div className="text-gray-400">
              <div>場所:</div>
              <div>時間:{getDateJP(r.start_time)}</div>
            </div>
          </div>
          <div className="flex">
            <PencilIcon className="h-7 w-7" />
            {/* TODO orgId変える */}
            <XCircleIcon className="h-7 w-7" onClick={() => onChangeProps(1, r.space_id, r.id)} />
          </div>
        </div>
      ))}

      <Modal
        data="予定を削除しますか？"
        showModal={showModal}
        onClickNo={() => setShowModal(false)}
        onClickYes={() => deleteReservation(orgId, spaceId, rvId)}
      />
    </>
  );
};

export default MyReservation;
