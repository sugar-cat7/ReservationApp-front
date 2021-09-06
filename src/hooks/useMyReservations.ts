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
  myReservations: [];
  isLoading: boolean;
  isError: boolean;
};
export const useMyReservations = (): Props => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROOT}/api/user/reservation`,
    fetcher,
  );

  //   const { data2, error2 } = useSWR(
  //     `${process.env.NEXT_PUBLIC_API_ROOT}/api/user/reservation`,
  //     fetcher,
  //   );

  return {
    myReservations: data,
    isLoading: !error && !data,
    isError: error,
  };
};
