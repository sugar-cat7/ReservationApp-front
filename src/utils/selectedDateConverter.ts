//Date型を2020-01-20T10:10 に変換する
export const getNowSelectedDateWithString = (date: Date | string) => {
  if (typeof date === 'string') {
    if (date.includes('.')) {
      const [d] = date.split('.');
      return d;
    }
    return date;
  }

  const dt = date;
  const y = dt.getFullYear();
  const m = ('00' + (dt.getMonth() + 1)).slice(-2);
  const d = ('00' + dt.getDate()).slice(-2);

  const hour_str = ('00' + date.getHours()).slice(-2);
  const minute_str = ('00' + date.getMinutes()).slice(-2);
  const result = y + '-' + m + '-' + d + 'T' + hour_str + ':' + minute_str;
  return result;
};

//日本語に変換
export const getDateJP = (date: string) => {
  const [ymd, time] = date.split('T');
  const [y, m, d] = ymd.split('-');
  const [t] = time.split('.');
  const [hour, minutes] = t.split(':');
  const result = y + '年' + m + '月' + d + '日 ' + hour + ':' + minutes;
  return result;
};

//fetch用
export const getDateWithString = (date: Date | string, isStart: boolean) => {
  if (typeof date === 'string') {
    return date;
  }
  const dt = date;
  const y = dt.getFullYear();
  // const m = dt.getMonth() + 1;
  let d: number;
  let m: number;
  if (isStart) {
    // y = dt.getFullYear() - 1;
    d = 1;
    m = dt.getMonth() + 1;
  } else {
    // y = dt.getFullYear() + 1;

    m = dt.getMonth() + 2;
    d = dt.getDate();
  }

  // const d = dt.getDate();
  const result = y + '-' + m + '-' + d;
  return result;
};
