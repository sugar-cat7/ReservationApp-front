import React from 'react';
import Layout from '../components/Layout';
import FullCalendar from '../components/Calendar';
import { useOrgUsers } from '../hooks/useOrgUsers';

const orgId = '4'; //TODO need to change
const Calendar = () => {
  const { users } = useOrgUsers(orgId);

  return (
    <Layout title="calendar">
      <FullCalendar users={users} />
    </Layout>
  );
};

export default Calendar;
