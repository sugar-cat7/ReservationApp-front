import { useState } from 'react';
import Modal from '../Atoms/Modal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ja';
import DateAndTimePickers from '../Organiams/DateAndTimePickers';
import ViewCard from '../Organiams/ViewCard';
import { useSpaceCondition } from '../../context/ ReservationStateContext';
import api from '../../utils/fetch';
import { getNowSelectedDateWithString, getDateJP } from '../../utils/selectedDateConverter';

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
  orgId: string | string[] | undefined;
  orgName: string | string[] | undefined;
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
  users: number[];
};

const FullCalendar: React.FC<Props> = ({ users, reservations, spaces, color, orgId, orgName }) => {
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
  const [data, setData] = useState({
    orgName: '',
    spaceName: '',
    startTime: '',
    endTime: '',
    users: [],
  });

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
      users: users.filter(({ id }) => d.users.includes(id)),
    });
    setIsReservationGet(true);
    setShowModal(true);
  };

  const onSelectEvent = async (e: React.MouseEvent<HTMLFormElement> & onSelectEventProps) => {
    await api
      .get(`/api/organization/${orgId}/space/${e.space_id}/reservation/${e.reservation_id}`)
      .then((data) => {
        selectHandler(data);
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <ViewCard spaces={spaces} color={color} orgName={orgName} />
      <Calendar
        selectable
        localizer={localizer}
        events={filteredReservations}
        startAccessor="start"
        endAccessor="end"
        style={{
          height: 550,
          marginTop: 10,
        }}
        formats={formats}
        defaultView="month"
        views={['month', 'day']}
        className="bg-white p-4 sm:w-max"
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
            <div>
              予約している人:
              {data.users.map(({ id, name }) => (
                <span key={id} className="mr-2">
                  {name}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <DateAndTimePickers
            startDate={getNowSelectedDateWithString(startDate)}
            endDate={getNowSelectedDateWithString(endDate)}
            startLabel="開始時間"
            endLabel="終了時間"
            users={users}
            orgId={orgId}
            orgName={orgName}
            isEdit={false}
            spaces={spaces}
          />
        )}
      </Modal>
    </>
  );
};

export default FullCalendar;
