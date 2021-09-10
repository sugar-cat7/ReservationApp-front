import useSWR from 'swr';
import api from '../utils/fetch';

type Props = {
  myReservations: [];
  isLoading: boolean;
  isError: boolean;
};

export const useMyReservations = (): Props => {
  const { data, error } = useSWR(`/api/user/reservation`, api.get);

  return {
    myReservations: data,
    isLoading: !error && !data,
    isError: error,
  };
};
