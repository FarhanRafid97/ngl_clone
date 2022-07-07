import {
  Flex,
  Text,
  Box,
  Input,
  Textarea,
  Button,
  Heading,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../../component/layouts/Layout';
import {
  useAllUserQuery,
  useSendMessageMutation,
} from '../../src/generated/graphql';

interface UsernamePageProps {
  params: { username: string };
}

const UsernamePage: React.FC<UsernamePageProps> = ({}) => {
  const router = useRouter();
  const username = router.query.username as string;
  const { data } = useAllUserQuery();
  const [sendMessage] = useSendMessageMutation();
  const [message, setMessage] = useState('');
  const isValidPath = data?.allUser?.filter((u) => u.username === username);
  console.log(isValidPath);
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
    const data = await sendMessage({ variables: { username, message } });
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
            background="gray.300"
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
