import Layout from '../components/Templates/Layout';
import SelectGroup from '../components/Templates/SelectGroup';

const SelectedGroup: React.FC = () => {
  return (
    <Layout title="グループ選択">
      <SelectGroup></SelectGroup>
    </Layout>
  );
};

export default SelectedGroup;
