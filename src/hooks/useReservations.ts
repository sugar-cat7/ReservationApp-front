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
    .catch((e) => console.log(e));

type Props = {
  reservations: [];
  isLoading: boolean;
  isError: boolean;
};
export const useReservations = (orgId: string, startTime: string, endTime: string): Props => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROOT}/api/organization/${orgId}/reservation?start_time=${startTime}&end_time=${endTime}`,
    // `${process.env.NEXT_PUBLIC_API_ROOT}/api/organization/${orgId}/reservation`, //動かなくなったので
    fetcher,
  );

  return {
    reservations: data,
    isLoading: !error && !data,
    isError: error,
  };
};
