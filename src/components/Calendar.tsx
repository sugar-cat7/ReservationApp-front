import { useState } from 'react';
import { useRouter } from 'next/router';
import Modal from '../utils/Modal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ja';

const localizer = momentLocalizer(moment);
const formats = {
  dateFormat: 'D',
  dayFormat: 'D(ddd)',
  monthHeaderFormat: 'YYYY年M月',
  dayHeaderFormat: 'M月D日(ddd)',
  dayRangeHeaderFormat: 'YYYY年M月',
};

type SlotInfo = {
  start: string | Date;
  end: string | Date;
  slots: Date[] | string[];
  action: 'select' | 'click' | 'doubleClick';
};

const FullCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | string>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSelect = (s: SlotInfo) => {
    setShowModal(true);
    setDate(s.start);
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: 360 }}
        formats={formats}
        defaultView="month"
        views={['month', 'week', 'day']}
        className="bg-white"
        selectable
        onSelectSlot={(s) => handleSelect(s)}
      />

      <Modal
        data={`予約を追加 ${date}`}
        showModal={showModal}
        onClickNo={() => setShowModal(false)}
      >
        ここにいい感じにformを作る
      </Modal>
    </>
  );
};

export default FullCalendar;
