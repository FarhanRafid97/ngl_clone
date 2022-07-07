import Layout from '../component/layouts/Layout';

interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = ({}) => {
  return (
    <Layout variant={'main'} headTitle={'404 not found'}>
      <div>ErrorPage</div>;
    </Layout>
  );
};

export default ErrorPage;
