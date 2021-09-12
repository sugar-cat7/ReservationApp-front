import useSWR from 'swr';
import api from '../utils/fetch';

type Props = {
  user: { id: number; name: string; kana: string };
  isLoading: boolean;
  isError: boolean;
};

export const useUser = (): Props => {
  const { data, error } = useSWR(`/api/user/${sessionStorage.getItem('user_id')}`, api.get);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
