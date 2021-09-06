import useSWR from 'swr';
const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `${sessionStorage.getItem('access_token')}`,
    },
  })
    .then((res) => {
      if (res.status === 401) {
        throw 'authentication failed';
      }
      if (res.status === 500) {
        throw 'Internal Error!';
      }
      return res.json();
    })
    .catch((e) => alert(e));
type Props = {
  spaces: [];
  isSpaceLoading: boolean;
  isError: boolean;
};
export const useOrgSpaces = (orgId: string): Props => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROOT}/api/organization/${orgId}/space`,
    fetcher,
  );

  return {
    spaces: data,
    isSpaceLoading: !error && !data,
    isError: error,
  };
};
