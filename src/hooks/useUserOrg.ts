import useSWR from 'swr';
import api from '../utils/fetch';

type Props = {
  organizations: [];
  isLoading: boolean;
  isError: boolean;
};

export const useUserOrg = (): Props => {
  const { data, error } = useSWR(`/api/user/organization`, api.get);

  return {
    organizations: data,
    isLoading: !error && !data,
    isError: error,
  };
};
