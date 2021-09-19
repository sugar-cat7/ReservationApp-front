import { FaBattleNet } from 'react-icons/fa';
import { BiBaseball } from 'react-icons/bi';
import { FcHome } from 'react-icons/fc';
import { GiTennisRacket } from 'react-icons/gi';

//追加したいアイコンはここから → https://react-icons.github.io/react-icons
export const iconMap = {
  'battle-net': FaBattleNet,
  baseball: BiBaseball,
  home: FcHome,
  'tennis-racket': GiTennisRacket,
};

export type IconProps = {
  width?: string;
  height?: string;
  name: keyof typeof iconMap;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ className, width, height, name }) => {
  const Icon = iconMap[name];
  return <Icon className={className} width={width} height={height} fill="currentColor" />;
};
