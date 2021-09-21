import fs from 'fs';
import { NextPage, GetStaticProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Templates/Layout';

type StaticProps = {
  terms: string;
};

const Terms: NextPage<StaticProps> = (props) => {
  const { terms } = { ...props };

  return (
    <>
      <Layout title="利用規約">
        <div className="sm:w-screen justify-center flex mt-12">
          <ReactMarkdown className="sm:w-10/12">{terms}</ReactMarkdown>
        </div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const terms = fs.readFileSync(process.cwd() + '/src/docs/TermsOfService.md', 'utf8');

  return {
    props: {
      terms: terms,
    },
  };
};

export default Terms;
