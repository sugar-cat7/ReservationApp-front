import useSWR from 'swr';
import api from '../utils/fetch';

type Props = {
  reservations: [];
  isLoading: boolean;
  isError: boolean;
};
export const useReservations = (orgId: string, startTime: string, endTime: string): Props => {
  const { data, error } = useSWR(
    `/api/organization/${orgId}/reservation?start_time=${startTime}&end_time=${endTime}`,
    api.get,
  );

  return {
    reservations: data,
    isLoading: !error && !data,
    isError: error,
  };
};
