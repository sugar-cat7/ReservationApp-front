import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import calender from '../../public/calender.png';
import mobile1 from '../../public/mobile1.png';
import { CalendarIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const usecase = [
  {
    id: 1,
    title: '使いやすい共有カレンダー',
    body: '大規模なグループ管理から日々の業務のスケジュール管理まで、見やすいカレンダー機能を活用できます',
  },
  {
    id: 2,
    title: '複数グループのカレンダー',
    body: 'カレンダーからグループのタスクにアクセスすれば必要な詳細をいつでも確認できます',
  },
  {
    id: 3,
    title: '予約機能',
    body: '24時間365日、好きな時間にスペースの予約したり、いつでもどこでも予定を確認できます',
  },
];

const helpLink = [
  {
    id: 1,
    link: '#',
    text: 'このサイトについて',
  },
  {
    id: 2,
    link: '#',
    text: 'プライバシーポリシー',
  },
  {
    id: 3,
    link: '#',
    text: '利用規約',
  },
  {
    id: 4,
    link: '#',
    text: 'お問い合わせ',
  },
  {
    id: 5,
    link: '/login',
    text: 'ログイン',
  },
];

const Home: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-full">
      <p className="w-full text-white h-24 text-4xl font-bold leading-snug text-center flex items-center pl-8 pr-8 bg-gray-700">
        <span>
          <CalendarIcon className="w-9 h-9" />
        </span>
        予定管理くん
      </p>
      <div className="relative bg-white pl-8 pr-8 w-full mb-8">
        <div className="flex flex-wrap justify-center items-center">
          <Image className="" width={520} height={520} src={calender} />
          <div className="">
            <p
              className=" text-5xl font-bold leading-snug"
              // style={{ width: 820, height: 140, left: 749, top: 297 }}
            >
              手軽に予約・手軽に共有
            </p>
            <br />
            <p
              className=" text-base leading-snug text-gray-500"
              // style={{ width: 563, height: 174, left: 749, top: 512 }}
            >
              サークルや研究室...様々なコミュニティで共有の予定カレンダーを作ることができます。
              <br />
              <br />
              予約管理くんは、カレンダーを通したデータ管理により一画面に集約・共有でき、
              <br />
              チームの予定管理を円滑にします。
              <br />
              <br />
              時間や場所を気にせず、いつでもどこでも予定を確認できます。
            </p>
            <br />

            <button
              className="flex items-center justify-center flex-1 h-full py-1 pl-1.5 pr-1 text-white bg-green-300 hover:bg-green-600 focus:outline-none focus:shadow-outline w-36 h-12 text-lg"
              onClick={() => {
                router.push('/login');
              }}
            >
              使ってみる！
            </button>
          </div>
        </div>
      </div>
      <div className="bg-black bg-opacity-90 justify-center items-center flex flex-wrap gap-x-32 gap-y-20 pt-20 pb-20">
        {usecase.map((u) => (
          <div key={u.id}>
            <p className="text-4xl font-bold leading-snug text-center text-green-400">0{u.id}</p>
            <p className="text-2xl font-bold leading-snug text-center text-white">{u.title}</p>
            <p className="w-64 text-sm font-bold leading-snug text-gray-400">{u.body}</p>
          </div>
        ))}
      </div>
      <div className="relative bg-white pl-8 pr-8 w-full mb-8 mt-8">
        <div className="flex flex-wrap justify-center items-center">
          <div className="">
            <p
              className=" text-4xl font-bold leading-snug"
              // style={{ width: 820, height: 140, left: 749, top: 297 }}
            >
              予定管理くん
            </p>
            <br />
            <p className=" text-base leading-snug text-gray-500">
              大規模なグループ管理から日々の業務のスケジュール管理まで、
              <br />
              グループのスペースごとの予約を確認できます
              <br />
              <br />
              時間や場所を気にせず、いつでもどこでも予定を確認できます。
              <br />
              <br />
              導入も簡単！アカウントを作ってメンバーを追加するだけ！
            </p>
            <br />
            <button
              className="flex items-center justify-center flex-1 h-full py-1 pl-1.5 pr-1 text-white bg-gray-300 hover:bg-gray-600 focus:outline-none focus:shadow-outline w-36 h-12 text-lg"
              onClick={() => {
                router.push('/login');
              }}
            >
              使ってみる！
            </button>
          </div>
          <Image className="" width={620} height={620} src={mobile1} />
        </div>
      </div>
      <div className="bg-gray-300 bg-opacity-90 justify-center items-center flex flex-wrap gap-12 pt-16 pb-8">
        {helpLink.map((h) => (
          <Link key={h.id} href={h.link}>
            <a className="text-gray-600 text-sm border-b border-gray-400">{h.text}</a>
          </Link>
        ))}
        <div className="w-full flex justify-center items-center text-gray-500 text-xs">
          © 2021 Forest|Japan
        </div>
      </div>
    </div>
  );
};

export default Home;
