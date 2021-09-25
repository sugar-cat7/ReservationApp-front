import { getDateJPFull } from '../../utils/selectedDateConverter';
import { PencilIcon } from '@heroicons/react/solid';
import { XCircleIcon } from '@heroicons/react/solid';

type reservationProps = {
  created_at: string;
  end_time: string;
  id: number;
  numbers: number;
  space_id: number;
  start_time: string;
  space_name: string;
  updated_at: string;
  organization_id: string;
  organization_name: string;
  memo: string;
  users: number[];
};

type Props = {
  value: reservationProps;
  onClick: (props: reservationProps) => void;
  onChangeProps: (
    orgId: string,
    spaceId: number,
    rvId: number,
    isEdit: boolean,
    start_time?: string,
    end_time?: string,
    // memo?: string,
  ) => void;
};

const ReservationListItem: React.FC<Props> = ({ value, onClick, onChangeProps }) => {
  return (
    <div className="flex w-80 border-b-2 border-gray-400 justify-between items-center mb-2 sm:w-96">
      <div onClick={() => onClick(value)}>
        {value.organization_name}
        <div className="text-gray-400">
          <div>場所:{value.space_name}</div>
          <div>時間:{getDateJPFull(value.start_time)}</div>
        </div>
      </div>
      <div className="flex">
        {value.users && value.users.length < 2 && (
          <PencilIcon
            className="h-7 w-7"
            onClick={() =>
              onChangeProps(
                value.organization_id,
                value.space_id,
                value.id,
                true,
                value.start_time,
                value.end_time,
                // r.memo,
              )
            }
          />
        )}
        <XCircleIcon
          className="h-7 w-7"
          onClick={() => onChangeProps(value.organization_id, value.space_id, value.id, false)}
        />
      </div>
    </div>
  );
};

export default ReservationListItem;
