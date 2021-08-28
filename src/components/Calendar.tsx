import Calendar from 'react-calendar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import 'react-calendar/dist/Calendar.css';
import Modal from '../utils/Modal';

const FullCalendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setShowModal(true);
    setDate(date);
  };

  const onClickDay = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const param = year + '-' + month + '-' + day;
    router.push({
      pathname: '/reservation/[date]',
      query: { date: param },
    });
  };

  return (
    <>
      <Calendar locale="ja-JP" onChange={setDate} onClickDay={openModal} value={date} />
      <Modal
        data={`${date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'}
        の予約を確認する`}
        showModal={showModal}
        onClickYes={onClickDay}
        onClickNo={() => setShowModal(false)}
      />
    </>
  );
};

export default FullCalendar;
