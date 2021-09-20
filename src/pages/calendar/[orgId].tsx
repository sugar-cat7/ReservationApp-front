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
import { useUser } from '../../hooks/useUser';

type ReservationsProps = {
  user_id: number;
  reservation_id: number;
  space_id: number;
  title: string;
  start: Date;
  end: Date;
  memo: string;
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
  const { logInUser, islogInUserLoading } = useUser();
  //この辺は全部書き直す
  const isOverAllLoading =
    isLoading || isSpaceLoading || isOrgLoading || islogInUserLoading || !orgId;

  if (isOverAllLoading) {
    return (
      <Layout title="予定カレンダー">
        <Loading />
      </Layout>
    );
  }

  if (reservations) {
    const rv: ReservationsProps = [];

    let start: Date;
    let end: Date;
    reservations.map(({ id, user_id, space_id, start_time, end_time, memo }) => {
      start = new Date(start_time);
      end = new Date(end_time);
      rv.push({
        title: memo,
        memo: memo,
        reservation_id: id,
        user_id: user_id,
        space_id: space_id,
        start: start,
        end: end,
      });
    });

    return (
      <Layout title="予定カレンダー">
        <ManagedSpaceConditionContext>
          <FullCalendar
            loggedInUserId={logInUser.id}
            users={org.users}
            reservations={rv}
            spaces={spaces}
            orgId={orgId}
            orgName={org.name}
          />
        </ManagedSpaceConditionContext>
      </Layout>
    );
  } else {
    <Layout title="予定カレンダー">
      <ManagedSpaceConditionContext>
        <FullCalendar
          loggedInUserId={logInUser.id}
          users={org.users}
          reservations={[]}
          spaces={spaces}
          orgId={orgId}
          orgName={org.name}
        />
      </ManagedSpaceConditionContext>
    </Layout>;
  }
};

export default Calendar;
