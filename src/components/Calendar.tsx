import { useState } from 'react';
import Modal from '../utils/Modal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ja';
import DateAndTimePickers from '../utils/DateAndTimePickers';
import ViewCard from '../utils/ViewCard';
import { useSpaceCondition } from '../context/ ReservationStateContext';

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
  reservations: {
    space_id: number;
    title: string;
    start: Date;
    end: Date;
  }[];
  spaces: {
    id: number;
    name: string;
  }[];
};
type ReservationProps = {
  space_id: number;
  title: string;
  start: Date;
  end: Date;
}[];

//グチャグチャになってきたので後で切り分けましょう
//TODO 時間指定で予定取ってくるhooks定義して、eventsに入れる、spaceごとに色分けするとわかりやすい気がする
const FullCalendar: React.FC<Props> = ({ users, reservations, spaces }) => {
  const { state } = useSpaceCondition();

  let filteredReservations: ReservationProps;
  if (state.spaceId !== 0) {
    filteredReservations = reservations.filter((r) => r.space_id === state.spaceId);
  } else {
    filteredReservations = reservations;
  }

  const [startDate, setStartDate] = useState<Date | string>(new Date());
  const [endDate, setEndDate] = useState<Date | string>(new Date());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isMonthViewd, setIsMonthviewd] = useState<boolean>(true);
  const getNowSelectedDateWithString = (date: Date | string) => {
    if (typeof date === 'string') {
      return date;
    }
    const dt = date;
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth() + 1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);

    const hour_str = ('00' + date.getHours()).slice(-2);
    const minute_str = ('00' + date.getMinutes()).slice(-2);
    const result = y + '-' + m + '-' + d + 'T' + hour_str + ':' + minute_str;
    return result;
  };

  const handleSelect = (s: SlotInfo) => {
    if (!isMonthViewd) {
      setStartDate(s.start);
      setEndDate(s.end);
      setShowModal(true);
    }
  };

  return (
    <>
      <ViewCard spaces={spaces} />
      <Calendar
        localizer={localizer}
        events={filteredReservations}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, marginTop: 10 }}
        formats={formats}
        defaultView="month"
        views={['month', 'day']}
        className="bg-white p-4"
        selectable
        onSelectSlot={(s) => handleSelect(s)}
        onView={(v) => {
          if (v === 'month') {
            setIsMonthviewd(true);
          } else {
            setIsMonthviewd(false);
          }
        }}
      />
      {/* TODO スタイルは調整の余地あり */}
      <Modal data={`予約を追加`} showModal={showModal} onClickNo={() => setShowModal(false)}>
        <DateAndTimePickers
          startDate={getNowSelectedDateWithString(startDate)}
          endDate={getNowSelectedDateWithString(endDate)}
          startLabel="開始時間"
          endLabel="終了時間"
          users={users}
          orgId={1} //need to change
          isEdit={false}
          spaces={spaces}
        />
      </Modal>
    </>
  );
};

export default FullCalendar;
