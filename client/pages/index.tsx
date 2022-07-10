import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useMyQuestionQuery } from '../src/generated/graphql';
import Layout from '../component/layouts/Layout';
import { useIsAuth } from '../src/utils/useIsAtuh';
import NextLink from 'next/link';

const Home: NextPage = () => {
  useIsAuth();

  const { data } = useMyQuestionQuery();
  const unreadMessage = data?.myAccount?.messages.filter(
    (m) => m.opened === false
  ).length;
  console.log(unreadMessage);

  return (
    <Layout variant="home" headTitle={'Home Page'}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        p="30px"
        bg="white"
        borderRadius="10px"
        border="1px solid #dbdbdb"
      >
        <Heading size="lg">Youve Got</Heading>
        <Text>{data?.myAccount?.messages.length} messages</Text>
        <Text>
          And{' '}
          <NextLink href="/question">
            <Link color="blue.400">{unreadMessage} Unread</Link>
          </NextLink>{' '}
          messages
        </Text>
      </Flex>

      <Flex direction="column" rowGap="25px">
        {/* {allMessage?.allMessage?.map((message, i) => (
          <Flex key={i} direction="column" boxShadow="xl">
            <Text>Id:{message.id}</Text>
            <Text>Message:{message.message}</Text>
          </Flex>
        ))} */}
      </Flex>
      <Text mt={4}>World</Text>
    </Layout>
  );
};

export default Home;
