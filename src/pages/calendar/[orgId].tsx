import React from 'react';
import Layout from '../../components/Templates/Layout';
import FullCalendar from '../../components/Templates/Calendar';
import { useReservations } from '../../hooks/useReservations';
import { useOrgSpaces } from '../../hooks/useOrgSpaces';
import { useOrg } from '../../hooks/useOrg';
import { ManagedSpaceConditionContext } from '../../context/ReservationStateContext';
import { useRouter } from 'next/router';
import { getDateWithString } from '../../utils/selectedDateConverter';
import Loading from '../../components/Atoms/Loading';

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

  const strOrdId = orgId as string;

  const { spaces, isSpaceLoading } = useOrgSpaces(strOrdId);

  const nowDate = new Date();
  const s = getDateWithString(nowDate, true);
  const e = getDateWithString(nowDate, false);
  //とりあえず１ヶ月先まで一括して取ってくる
  const { reservations, isLoading } = useReservations(strOrdId, s, e);
  const { org, isOrgLoading } = useOrg(strOrdId);

  const isLoding = isLoading || isSpaceLoading || isOrgLoading || !orgId;

  if (isLoding) {
    return (
      <Layout title="予定カレンダー">
        <Loading />
      </Layout>
    );
  }
  const rv: ReservationsProps = [];

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
      bgColor: `rgba(${r}, ${g}, ${b}, 0.5)`,
    });
    if (i <= 2) {
      [r, g, b] = [0, 0, 0];
    }
  });

  return (
    <Layout title="予定カレンダー">
      <ManagedSpaceConditionContext>
        <FullCalendar
          users={org.users}
          reservations={rv}
          spaces={spaces}
          color={spaceColor}
          orgId={orgId}
          orgName={org.name}
        />
      </ManagedSpaceConditionContext>
    </Layout>
  );
};

export default Calendar;
