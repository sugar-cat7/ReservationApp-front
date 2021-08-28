import Calendar from 'react-calendar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import 'react-calendar/dist/Calendar.css';

const FullCalendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setShowModal(true);
    setDate(date);
  };

  const onClickDay = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const param = year + '-' + month + '-' + day;
    router.push({
      pathname: '/reservation/[date]',
      query: { date: param },
    });
  };

  return (
    <>
      <Calendar locale="ja-JP" onChange={setDate} onClickDay={openModal} value={date} />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {/* useStateが非同期で変わらない場合があるのでもう一回メソッド実行してる */}
                    {date.getFullYear() +
                      '年' +
                      (date.getMonth() + 1) +
                      '月' +
                      date.getDate() +
                      '日'}
                    の予約を確認する
                  </p>
                </div>
                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    いいえ
                  </button>
                  <button
                    className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClickDay}
                  >
                    はい
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default FullCalendar;
