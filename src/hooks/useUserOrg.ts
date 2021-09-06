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
  organizations: [];
  isLoading: boolean;
  isError: boolean;
};

export const useUserOrg = (): Props => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROOT}/api/user/organization`,
    fetcher,
  );

  return {
    organizations: data,
    isLoading: !error && !data,
    isError: error,
  };
};
