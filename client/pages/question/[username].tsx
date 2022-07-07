import {
  Button,
  Flex,
  Heading,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../../component/layouts/Layout';
import {
  useAllUserQuery,
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
        cache.evict({ fieldName: 'allMessage:{}' });
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
    console.log(data);
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
