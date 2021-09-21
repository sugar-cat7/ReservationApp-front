import { getDateJPFull, getDateJPMonth, getDateJPHour } from '../../utils/selectedDateConverter';
import { MenuAlt2Icon, ClockIcon, UserIcon, HomeIcon } from '@heroicons/react/outline';

type Props = {
  orgName: string;
  spaceName: string;
  startTime: string;
  endTime: string;
  memo: string;
  users: { id: number; name: string; kana: string }[];
};

const DetailReservation: React.FC<Props> = (props) => {
  return (
    <div className="w-80 pr-4 pl-4 pb-4">
      <div className="flex pb-2 items-center">
        <ClockIcon className="w-5 mr-4" />
        <div>
          {getDateJPMonth(props.startTime)}~{getDateJPHour(props.endTime)}
        </div>
      </div>
      <div className="flex pb-2 items-center">
        <HomeIcon className="w-4 mr-4" />
        <div>
          {props.orgName}[{props.spaceName}]
        </div>
      </div>
      <div className="flex pb-2 items-center">
        <MenuAlt2Icon className="w-5 mr-4" />
        <div>{props.memo}</div>
      </div>
      <div className="flex items-center">
        <UserIcon className="w-5 mr-4" />
        <div>
          {props.users.map(({ id, name }) => (
            <span key={id} className="mr-2 border rounded-full border-indigo-900 pr-1 pl-1">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailReservation;
