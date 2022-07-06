import { useMyQuestionQuery } from '../../src/generated/graphql';
import { Flex, Box, Link } from '@chakra-ui/react';
import Layout from '../../component/layouts/Layout';
import NextLink from 'next/link';
interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const { data } = useMyQuestionQuery();
  const myQuestion = data?.myAccount?.messages;
  return (
    <Layout variant={'main'} headTitle={'question'}>
      <Flex>
        {myQuestion?.map((m, i) => (
          <NextLink key={i} href={`${m.id}`}>
            <Link padding="15">Open</Link>
          </NextLink>
        ))}
      </Flex>
    </Layout>
  );
};

export default Index;
