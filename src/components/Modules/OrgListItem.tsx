import { iconMap } from '../Icon/Icon';

type orgProps = {
  id: number;
  name: string;
  public: boolean;
  description: string;
  rule: string;
  image_url: keyof typeof iconMap;
};

type Props = {
  value: orgProps;
  onClick: () => void;
};

const OrgListItem: React.FC<Props> = ({ value, onClick }) => {
  return (
    <div
      className={`bg-white w-72 mx-auto rounded-xl  shadow-md overflow-hidden md:max-w-2xl  hover:bg-gray hover:shadow-lg hover:border-transparent mr-4 ml-4 mb-4`}
      onClick={onClick}
    >
      <div>
        <div className="p-2">
          <div className="tracking-wide text-sm text-indigo-500 font-semibold">
            グループ: {value.name}
          </div>
          <div className="tracking-wide text-xs text-gray-500 truncate">
            {value.description ? value.description : '説明はありません'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgListItem;
