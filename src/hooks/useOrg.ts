import useSWR from 'swr';
import api from '../utils/fetch';

type Props = {
  org: { id: number; name: string; users: { id: number; name: string; kana: string }[] };
  isOrgLoading: boolean;
  isOrgError: boolean;
};
export const useOrg = (orgId: string): Props => {
  const { data, error } = useSWR(`/api/organization/${orgId}`, api.get);

  return {
    org: data,
    isOrgLoading: !error && !data,
    isOrgError: error,
  };
};
