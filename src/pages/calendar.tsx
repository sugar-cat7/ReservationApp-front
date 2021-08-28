import React from 'react';
import Layout from '../components/Layout';
import FullCalendar from '../components/Calendar';

const calendar = () => {
  return (
    <Layout title="calendar">
      <FullCalendar />
    </Layout>
  );
};

export default calendar;
