import React from 'react';
// import CalendarComponent from '../components/Calendar';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
const FullCalendar = dynamic(() => import('../components/Calendar'), {
  ssr: false,
});
const calendar = () => {
  return (
    <Layout title="calendar">
      <FullCalendar />
    </Layout>
  );
};

export default calendar;
