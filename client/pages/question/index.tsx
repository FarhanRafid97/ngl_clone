import {
  useMyQuestionQuery,
  useOpenedMessageMutation,
  useQuestionOwnerQuery,
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
    <Layout variant={'home'} headTitle={'question'}>
      <Box alignItems="center" minH="100vh">
        <Heading
          textAlign="center"
          p="10px"
          w="100%"
          bg="white"
          size="lg"
          borderRadius="10px"
          border="1px solid #dbdbdb"
          mb={4}
        >
          Your Question
        </Heading>
        <Flex
          columnGap="25px"
          flexWrap="wrap"
          justifyContent="center"
          rowGap="25px"
          p="20px"
          bg="white"
          borderRadius="10px"
          border="1px solid #dbdbdb"
        >
          {data?.myAccount?.messages.map((m, i) => (
            <NextLink key={i} href={`/question/detail/${m.id}`}>
              <Link
                w="130px"
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
                  openedMessage({
                    variables: { id: m.id, opened: true },
                    update: (cache, { data }) => {
                      console.log(data);
                      return cache.readQuery;
                    },
                  });
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
      </Box>
    </Layout>
  );
};

export default Index;
