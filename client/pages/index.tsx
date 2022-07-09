import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../component/layouts/Layout';
import { useAllMessageQuery, useAllUserQuery } from '../src/generated/graphql';
import { useIsAuth } from '../src/utils/useIsAtuh';
import styles from '../styles/Home.module.css';
import { Text, Flex } from '@chakra-ui/react';
import withApollo from '../src/utils/createWithApollo';

const Home: NextPage = () => {
  useIsAuth();
  const { data } = useAllUserQuery();
  const { data: allMessage } = useAllMessageQuery();

  return (
    <Layout variant="main" headTitle={'Home Page'}>
      <Text>World</Text>
      <Flex direction="column" rowGap="25px">
        {allMessage?.allMessage?.map((message, i) => (
          <Flex key={i} direction="column" boxShadow="xl">
            <Text>Id:{message.id}</Text>
            <Text>Message:{message.message}</Text>
          </Flex>
        ))}
      </Flex>
      <Text>World</Text>
    </Layout>
  );
};

export default Home;
