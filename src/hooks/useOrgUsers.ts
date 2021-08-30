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
      return res.json();
    })
    .catch((e) => alert(e));

export const useOrgUsers = (orgId: string) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROOT}/api/organization/${orgId}/user`,
    fetcher,
  );

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};
