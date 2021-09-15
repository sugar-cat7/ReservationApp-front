import { useState } from 'react';
import Modal from '../Atoms/Modal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ja';
import DateAndTimePickers from '../Organiams/DateAndTimePickers';
import ViewCard from '../Organiams/ViewCard';
import { useSpaceCondition } from '../../context/ReservationStateContext';
import api from '../../utils/fetch';
import { getNowSelectedDateWithString } from '../../utils/selectedDateConverter';
import DetailReservation from '../Organiams/DetailReservation';

const localizer = momentLocalizer(moment);
const formats = {
  dateFormat: 'D',
  dayFormat: 'D(ddd)',
  monthHeaderFormat: 'YYYY年M月',
  dayHeaderFormat: 'M月D日(ddd)',
  dayRangeHeaderFormat: () => 'YYYY年M月',
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
    capacity: number;
    // description: null;
    id: number;
    // image_url: null;
    name: string;
    organization_id: number;
    // rule: null;
  }[];
  color: {
    spaceId: number;
    bgColor: string;
  }[];
  orgId?: string | string[];
  orgName?: string | string[];
  loggedInUserId: number;
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
  title: string;
  start: Date;
  end: Date;
};
type Data = {
  memo: string;
  organization_name: string;
  space_name: string;
  start_time: string;
  end_time: string;
  users: number[];
};

const FullCalendar: React.FC<Props> = ({
  users,
  reservations,
  spaces,
  color,
  orgId,
  orgName,
  loggedInUserId,
}) => {
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
    memo: '',
    orgName: '',
    spaceName: '',
    startTime: '',
    endTime: '',
    users: [{ id: 0, name: '', kana: '' }],
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
      memo: d.memo,
      orgName: d.organization_name,
      spaceName: d.space_name,
      startTime: d.start_time,
      endTime: d.end_time,
      users: users.filter(({ id }) => d.users.includes(id)),
    });
    setIsReservationGet(true);
    setShowModal(true);
  };

  const onSelectEvent = async ({ space_id, reservation_id }: onSelectEventProps) => {
    await api
      .get(`/api/organization/${orgId}/space/${space_id}/reservation/${reservation_id}`)
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
          height: 620,
          marginTop: 10,
        }}
        formats={formats}
        defaultView="month"
        views={['month', 'day']}
        className="bg-white p-4 sm:w-max"
        // @ts-expect-error 無理やりidを渡しているため
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
          <DetailReservation {...data} />
        ) : (
          <DateAndTimePickers
            startDate={getNowSelectedDateWithString(startDate)}
            endDate={getNowSelectedDateWithString(endDate)}
            users={users}
            orgId={orgId}
            orgName={orgName}
            isEdit={false}
            spaces={spaces}
            loggedInUserId={loggedInUserId}
          />
        )}
      </Modal>
    </>
  );
};

export default FullCalendar;
