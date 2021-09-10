import Layout from '../components/Layout';
import MyReservation from '../components/MyReservation';
import { useMyReservations } from '../hooks/useMyReservations';

const MyReservations: React.FC = () => {
  const { myReservations, isLoading } = useMyReservations();

  return (
    <Layout title="自分の予約確認">
      {!isLoading && <MyReservation myReservations={myReservations}></MyReservation>}
    </Layout>
  );
};

export default MyReservations;
