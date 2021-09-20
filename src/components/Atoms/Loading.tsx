import ReactLoading, { LoadingProps } from 'react-loading';

const Loading: React.FC<LoadingProps> = (props) => {
  return <ReactLoading type="spin" color="black" {...props} />;
};

export default Loading;
