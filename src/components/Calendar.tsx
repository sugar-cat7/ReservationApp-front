import { useState, useCallback } from 'react';
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
  color: {
    spaceId: number;
    bgColor: string;
  }[];
  orgId: number;
};
type ReservationProps = {
  space_id: number;
  title: string;
  start: Date;
  end: Date;
}[];
type onSelectEventProps = {
  space_id: number;
  reservation_id: number;
};
type Data = {
  organization_name: string;
  space_name: string;
  start_time: string;
  end_time: string;
};

//グチャグチャになってきたので後で切り分けましょう
//TODO 時間指定で予定取ってくるhooks定義して、eventsに入れる、spaceごとに色分けするとわかりやすい気がする
const FullCalendar: React.FC<Props> = ({ users, reservations, spaces, color, orgId }) => {
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
  const [isReservationGet, setIsReservationGet] = useState<boolean>(false);
  const [data, setData] = useState({ orgName: '', spaceName: '', startTime: '', endTime: '' });

  const getNowSelectedDateWithString = (date: Date | string) => {
    if (typeof date === 'string') {
      if (date.includes('.')) {
        const [d] = date.split('.');
        return d;
      }
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

  const selectHandler = (d: Data) => {
    setData({
      orgName: d.organization_name,
      spaceName: d.space_name,
      startTime: d.start_time,
      endTime: d.end_time,
    });
    setIsReservationGet(true);
    setShowModal(true);
  };
  const getDateJP = (date: string) => {
    const [ymd, time] = date.split('T');
    const [y, m, d] = ymd.split('-');
    const [t] = time.split('.');
    const [hour, minutes] = t.split(':');
    const result = y + '年' + m + '月' + d + '日 ' + hour + ':' + minutes;
    return result;
  };

  const onSelectEvent = async (e: React.MouseEvent<HTMLFormElement> & onSelectEventProps) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_ROOT}/api/organization/${orgId}/space/${e.space_id}/reservation/${e.reservation_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${sessionStorage.getItem('access_token')}`,
          },
        },
      )
        .then((res) => {
          if (res.status === 401) {
            throw 'authentication failed';
          }
          if (res.status === 500) {
            throw 'Internal Error!';
          }
          if (res.ok) {
            const resJson = res.json();
            return resJson;
          }
        })
        .then((data) => {
          selectHandler(data);
        });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <ViewCard spaces={spaces} color={color} />
      <Calendar
        selectable
        localizer={localizer}
        events={filteredReservations}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, marginTop: 10 }}
        formats={formats}
        defaultView="month"
        views={['month', 'day']}
        className="bg-white p-4"
        onSelectEvent={(event) => onSelectEvent(event)}
        onSelectSlot={(s) => handleSelect(s)}
        onView={(v) => {
          if (v === 'month') {
            setIsMonthviewd(true);
          } else {
            setIsMonthviewd(false);
          }
        }}
        eventPropGetter={(event) => {
          const backgroundColor = color.filter((c) => c.spaceId === event.space_id);
          return {
            style: {
              // display: 'grid',
              // gridTemplateRows: '200px 100px',
              // gridTemplateColumns: '200px 100px 100px',
              // gridAutoFlow: 'column',
              border: '0px',
              backgroundColor: backgroundColor[0].bgColor,
            },
          };
        }}
      />
      {/* TODO スタイルは調整の余地あり */}
      <Modal
        data={isReservationGet ? '予約を確認' : `予約を追加`}
        showModal={showModal}
        onClickNo={() => {
          setShowModal(false);
          setIsReservationGet(false);
        }}
      >
        {isReservationGet ? (
          <div className="w-80 p-4">
            <div>グループ名: {data.orgName}</div>
            <div>スペース名: {data.spaceName}</div>
            <div>開始時間: {getDateJP(data.startTime)}</div>
            <div>終了時間: {getDateJP(data.endTime)}</div>
          </div>
        ) : (
          <DateAndTimePickers
            startDate={getNowSelectedDateWithString(startDate)}
            endDate={getNowSelectedDateWithString(endDate)}
            startLabel="開始時間"
            endLabel="終了時間"
            users={users}
            orgId={orgId} //need to change
            isEdit={false}
            spaces={spaces}
          />
        )}
      </Modal>
    </>
  );
};

export default FullCalendar;
