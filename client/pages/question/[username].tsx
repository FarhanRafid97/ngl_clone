import {
  Button,
  Flex,
  Heading,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../../component/layouts/Layout';
import {
  AllMessageDocument,
  AllMessageQuery,
  MyQuestionDocument,
  MyQuestionQuery,
  useAllUserQuery,
  useMyQuestionQuery,
  useSendMessageMutation,
} from '../../src/generated/graphql';
import withApollo from '../../src/utils/createWithApollo';

interface UsernamePageProps {
  params: { username: string };
}

const UsernamePage: React.FC<UsernamePageProps> = ({}) => {
  //params
  const router = useRouter();
  const username = router.query.username as string;
  const { data } = useAllUserQuery();
  const { data: messages } = useMyQuestionQuery();
  //send message
  const [sendMessage] = useSendMessageMutation();
  const [message, setMessage] = useState('');
  //validated path
  const isValidPath = data?.allUser?.filter((u) => u.username === username);
  const toast = useToast();

  if (isValidPath?.length === 0) {
    return (
      <Layout variant={'main'} headTitle={'404'}>
        <Heading textAlign="center">Page Not Found 404</Heading>
      </Layout>
    );
  }
  const HandlerSendMessage = async () => {
    if (!username) {
      return null;
    }
    const data = await sendMessage({
      variables: { username, message },
      update: (cache, { data }) => {
        const dataMessage = cache.readQuery<MyQuestionQuery>({
          query: MyQuestionDocument,
        })?.myAccount;
        console.log('datamessage', dataMessage);
        console.log('new data', data);
        cache.writeQuery<MyQuestionQuery>({
          query: MyQuestionDocument,
          data: {
            myAccount: {
              __typename: 'User',
              id: dataMessage!.id as number,
              username: dataMessage!.username,
              messages: [data!.sendMessage, ...dataMessage!.messages],
            },
          },
        });
      },
    });
    if (data) {
      toast({
        title: 'Message Sended.',
        description: `Success Send Message To ${username}`,
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
      setMessage('');
    }
    return data;
  };
  return (
    <Layout variant={'main'} headTitle={'Your page'}>
      <Flex margin="auto" height="100vh">
        <Flex
          borderRadius="15px"
          position="relative"
          bg="white"
          padding="15px"
          direction="column"
          margin="auto"
          bgGradient="linear(to-r, green.200, blue.500)"
          color="white"
        >
          <Text textAlign="center" mb={4}>
            Send Me Anonymous
          </Text>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            w="300px"
            background="whiteAlpha.500"
            placeholder="send me anonymous"
          />
          <Button
            colorScheme="telegram"
            onClick={HandlerSendMessage}
            mt={4}
            w="150px"
            ml="auto"
          >
            Send
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default UsernamePage;
