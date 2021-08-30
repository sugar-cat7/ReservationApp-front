import { useState } from 'react';
import Modal from '../utils/Modal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ja';
import DateAndTimePickers from '../utils/DateAndTimePickers';

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
type Props = {
  users: {
    id: number;
    name: string;
    kana: string;
  }[];
};

const FullCalendar: React.FC<Props> = ({ users }) => {
  const [date, setDate] = useState<Date | string>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleSelect = (s: SlotInfo) => {
    setDate(s.start);
    setShowModal(true);
  };

  const getNowDateWithString = (date: Date) => {
    const dt = date;
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth() + 1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);

    const hour_str = ('00' + date.getHours()).slice(-2);
    const minute_str = ('00' + date.getMinutes()).slice(-2);
    const result = y + '-' + m + '-' + d + 'T' + hour_str + ':' + minute_str;
    return result;
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
      {/* TODO スタイルは調整の余地あり */}
      <Modal data={`予約を追加`} showModal={showModal} onClickNo={() => setShowModal(false)}>
        <DateAndTimePickers
          date={getNowDateWithString(date)}
          startLabel="開始時間"
          endLabel="終了時間"
          users={users}
        />
      </Modal>
    </>
  );
};

export default FullCalendar;
