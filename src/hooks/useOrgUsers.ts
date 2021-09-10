import useSWR from 'swr';
import api from '../utils/fetch';
type Props = {
  users: [];
  isUserLoading: boolean;
  isError: boolean;
};
export const useOrgUsers = (orgId: string): Props => {
  const { data, error } = useSWR(`/api/organization/${orgId}/user`, api.get);

  return {
    users: data,
    isUserLoading: !error && !data,
    isError: error,
  };
};
