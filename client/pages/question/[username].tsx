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
  QuestionOwnerDocument,
  QuestionOwnerQuery,
  useAllUserQuery,
  useMyQuestionQuery,
  useQuestionOwnerQuery,
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
  const { data: allUser } = useAllUserQuery();
  // const { data: myQuestion } = useMyQuestionQuery();
  const { data: messages } = useMyQuestionQuery();
  const { data: ownerQuestion } = useQuestionOwnerQuery({
    variables: { username },
  });
  console.log(ownerQuestion?.questionOwner?.id);
  //send message
  // console.log('my question ', myQuestion);
  // console.log('owner question ', ownerQuestion);

  const [sendMessage] = useSendMessageMutation();
  const [message, setMessage] = useState('');
  //validated path
  const isValidPath = allUser?.allUser?.filter((u) => u.username === username);
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
        const oldMessage = cache.readFragment<QuestionOwnerQuery>({
          id: 'User:' + ownerQuestion?.questionOwner?.id, // The value of the to-do item's cache ID
          fragment: gql`
            fragment QuestionSnippet on User {
              id
              username
              messages {
                id
                receiverId
                message
                opened
              }
            }
          `,
        });
        console.log('old data', oldMessage);
        cache.writeFragment<any>({
          id: 'User:' + ownerQuestion?.questionOwner?.id, // The value of the to-do item's cache ID
          fragment: gql`
            fragment QuestionSnippet on User {
              id
              username
              messages {
                id
                receiverId
                message
                opened
              }
            }
          `,
          data: {
            id: ownerQuestion!.questionOwner!.id as number,
            username: ownerQuestion!.questionOwner!.username,
            messages: [
              data!.sendMessage,
              ...ownerQuestion!.questionOwner!.messages,
            ],
          },
        });
        // if (data?.sendMessage.receiverId !== myQuestion?.myAccount?.id) {
        //   return;
        // }

        // const dataMessage = cache.readQuery<MyQuestionQuery>({
        //   query: MyQuestionDocument,
        // })?.myAccount;
        // console.log('datamessage', dataMessage);
        // console.log('new data', data);
        // cache.writeQuery<MyQuestionQuery>({
        //   query: MyQuestionDocument,
        //   data: {
        //     myAccount: {
        //       __typename: 'User',
        //       id: dataMessage!.id as number,
        //       username: dataMessage!.username,
        //       messages: [data!.sendMessage, ...dataMessage!.messages],
        //     },
        //   },
        // });
        // const dataMessage = cache.readQuery<MyQuestionQuery>({
        //   query: MyQuestionDocument,
        // })?.myAccount;
        // console.log('datamessage', dataMessage);
        // console.log('new data', data);
        // cache.writeQuery<MyQuestionQuery>({
        //   query: MyQuestionDocument,
        //   data: {
        //     myAccount: {
        //       __typename: 'User',
        //       id: dataMessage!.id as number,
        //       username: dataMessage!.username,
        //       messages: [data!.sendMessage, ...dataMessage!.messages],
        //     },
        //   },
        // });
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
