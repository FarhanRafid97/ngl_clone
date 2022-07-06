import { layout } from '@chakra-ui/styled-system';
import { useRouter } from 'next/router';
import Layout from '../../../component/layouts/Layout';
import { useMessageQuery } from '../../../src/generated/graphql';

interface DetailMessageProps {}

const DetailMessage: React.FC<DetailMessageProps> = ({}) => {
  const router = useRouter();
  const messageId = Number(router.query.id) as number;
  const { data } = useMessageQuery({ variables: { id: messageId } });
  return (
    <Layout variant={'main'} headTitle={'detail question'}>
      {data?.message?.message}
    </Layout>
  );
};

export default DetailMessage;
