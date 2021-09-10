import useSWR from 'swr';
import api from '../utils/fetch';

type Props = {
  spaces: [];
  isSpaceLoading: boolean;
  isError: boolean;
};
export const useOrgSpaces = (orgId: string): Props => {
  const { data, error } = useSWR(`/api/organization/${orgId}/space`, api.get);

  return {
    spaces: data,
    isSpaceLoading: !error && !data,
    isError: error,
  };
};
