import {
  useMyQuestionQuery,
  useOpenedMessageMutation,
} from '../../src/generated/graphql';
import { Heading, Flex, Box, Link, Text, Image } from '@chakra-ui/react';
import Layout from '../../component/layouts/Layout';
import NextLink from 'next/link';
import mypic from '../../img/mail2.png';
import openedMail from '../../img/openMail.png';
interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const { data } = useMyQuestionQuery();
  const [openedMessage] = useOpenedMessageMutation();
  const myQuestion = data?.myAccount?.messages;

  return (
    <Layout variant={'main'} headTitle={'question'}>
      <Flex alignItems="center" direction="column" minH="100vh" rowGap="25px">
        <Heading>Your Question</Heading>
        <Flex
          columnGap="15px"
          flexWrap="wrap"
          justifyContent="center"
          rowGap="15px"
        >
          {myQuestion?.map((m, i) => (
            <NextLink key={i} href={`/question/detail/${m.id}`}>
              <Link
                w="150px"
                borderRadius="15px"
                padding="20px 30px"
                bgGradient={
                  m.opened ? 'null' : 'linear(to-l, #7928CA, #FF0080)'
                }
                bg={m.opened ? 'gray.200' : undefined}
                onClick={() => {
                  if (m.opened) {
                    return;
                  }
                  openedMessage({ variables: { id: m.id, opened: true } });
                }}
              >
                <Image
                  src={m.opened ? openedMail.src : mypic.src}
                  alt="Dan Abramov"
                />
              </Link>
            </NextLink>
          ))}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Index;
