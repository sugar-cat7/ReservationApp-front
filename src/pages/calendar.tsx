import React from 'react';
import Layout from '../components/Layout';
import FullCalendar from '../components/Calendar';
import { useOrgUsers } from '../hooks/useOrgUsers';
import { useReservations } from '../hooks/useReservations';
import { useOrgSpaces } from '../hooks/useOrgSpaces';

type ReservationsProps = {
  title: string;
  start: Date;
  end: Date;
}[];

const orgId = '1'; //TODO need to change
const Calendar = () => {
  const { users, isUserLoading } = useOrgUsers(orgId);
  const { spaces, isSpaceLoading } = useOrgSpaces(orgId);

  const getDateWithString = (date: Date | string, isStart: boolean) => {
    if (typeof date === 'string') {
      return date;
    }
    const dt = date;
    let y: number;
    if (isStart) {
      y = dt.getFullYear() - 1;
    } else {
      y = dt.getFullYear() + 1;
    }
    const m = dt.getMonth() + 1;
    const d = dt.getDate();
    const result = y + '-' + m + '-' + d;
    return result;
  };
  const nowDate = new Date();
  const s = getDateWithString(nowDate, true);
  const e = getDateWithString(nowDate, false);
  //とりあえず一年分一括して取ってくる
  const { reservations, isLoading } = useReservations(orgId, s, e);

  const rv: ReservationsProps = [];
  if (isLoading || isUserLoading || isSpaceLoading) {
    return <div>loding</div>;
  }
  let start: Date;
  let end: Date;
  reservations.map(({ start_time, end_time }) => {
    start = new Date(start_time);
    end = new Date(end_time);
    rv.push({
      title: '',
      start: start,
      end: end,
    });
  });

  return (
    <Layout title="calendar">
      <FullCalendar users={users} reservations={rv} spaces={spaces} />
    </Layout>
  );
};

export default Calendar;
