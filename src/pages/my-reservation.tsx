import Layout from '../components/Templates/Layout';
import MyReservation from '../components/Templates/MyReservation';
import { useMyReservations } from '../hooks/useMyReservations';
import Loading from '../components/Atoms/Loading';
const MyReservations: React.FC = () => {
  const { myReservations, isLoading } = useMyReservations();

  return (
    <Layout title="自分の予約確認">
      {isLoading ? <Loading /> : <MyReservation myReservations={myReservations}></MyReservation>}
    </Layout>
  );
};

export default MyReservations;
