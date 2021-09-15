import useSWR from 'swr';
import api from '../utils/fetch';

type Props = {
  logInUser: { id: number; name: string; kana: string; email: string };
  islogInUserLoading: boolean;
  isError: boolean;
};

export const useUser = (): Props => {
  const { data, error } = useSWR(`/api/login/user`, api.get);

  return {
    logInUser: data,
    islogInUserLoading: !error && !data,
    isError: error,
  };
};
