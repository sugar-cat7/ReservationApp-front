//使ってない。消すかどうか検討中

import Layout from '../../components/Layout';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ja from 'date-fns/locale/ja';
import { useRouter } from 'next/router';
// import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  ja: ja,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

//API Reference https://jquense.github.io/react-big-calendar/examples/index.html
const Day: React.FC = () => {
  const router = useRouter();
  return (
    <Layout title="reservation">
      <Calendar
        localizer={localizer}
        events={[]}
        defaultView="day"
        views={['day']}
        // events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 650 }}
        onNavigate={(date) => {
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const param = year + '-' + month + '-' + day;
          router.push({
            pathname: '/reservation/[date]',
            query: { date: param },
          });
        }}
      />
      <div>
        <div>予定追加ボタン</div>
      </div>
    </Layout>
  );
};

export default Day;
