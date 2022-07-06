import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../component/layouts/Layout';
import { useAllUserQuery } from '../src/generated/graphql';
import { useIsAuth } from '../src/utils/useIsAtuh';
import styles from '../styles/Home.module.css';
import { Text } from '@chakra-ui/react';

const Home: NextPage = () => {
  useIsAuth();
  const { data } = useAllUserQuery();
  console.log('data index', data);
  return (
    <Layout variant="main" headTitle={'Home Page'}>
      <Text>World</Text>
      <Text>World</Text>
    </Layout>
  );
};

export default Home;
