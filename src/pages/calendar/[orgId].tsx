import React from 'react';
import Layout from '../../components/Layout';
import FullCalendar from '../../components/Calendar';
import { useOrgUsers } from '../../hooks/useOrgUsers';
import { useReservations } from '../../hooks/useReservations';
import { useOrgSpaces } from '../../hooks/useOrgSpaces';
import { ManagedSpaceConditionContext } from '../../context/ ReservationStateContext';
import { useRouter } from 'next/router';

type ReservationsProps = {
  user_id: number;
  reservation_id: number;
  space_id: number;
  title: string;
  start: Date;
  end: Date;
}[];

type CalenderBg = {
  spaceId: number;
  bgColor: string;
}[];

const Calendar = () => {
  const router = useRouter();
  const { orgId } = router.query;

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
  reservations.map(({ id, user_id, space_id, start_time, end_time }) => {
    start = new Date(start_time);
    end = new Date(end_time);
    rv.push({
      title: '',
      reservation_id: id,
      user_id: user_id,
      space_id: space_id,
      start: start,
      end: end,
    });
  });

  const spaceColor: CalenderBg = [];
  const tmp = Math.floor(255 / spaces.length);
  let [r, g, b, i] = [0, 0, 0, 0];
  spaces.map(({ id }) => {
    if (i % 3 === 0) {
      r += tmp;
      i += 1;
    } else if (i % 3 === 1) {
      g += tmp;
      i += 1;
    } else {
      b += tmp;
      i += 1;
    }

    spaceColor.push({
      spaceId: id,
      bgColor: `rgba(${r}, ${g}, ${b}, 0.4)`,
    });
  });

  return (
    <Layout title="calendar">
      <ManagedSpaceConditionContext>
        <FullCalendar
          users={users}
          reservations={rv}
          spaces={spaces}
          color={spaceColor}
          orgId={orgId}
        />
      </ManagedSpaceConditionContext>
    </Layout>
  );
};

export default Calendar;
