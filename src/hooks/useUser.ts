import useSWR from 'swr';
import api from '../utils/fetch';

type Props = {
  user: { id: number; name: string; kana: string; email: string };
  isLoading: boolean;
  isError: boolean;
};

export const useUser = (): Props => {
  const { data, error } = useSWR(`/api/login/user`, api.get);
  console.log(data);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
