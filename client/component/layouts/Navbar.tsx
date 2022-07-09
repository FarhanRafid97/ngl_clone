import { Box, Avatar, Flex, Link, Text, Button } from '@chakra-ui/react';
import {
  useLogOutMutation,
  useMyAccountQuery,
} from '../../src/generated/graphql';
import NextLink from 'next/link';
import { Cache, useApolloClient } from '@apollo/client';
import { isServer } from '../../src/utils/isServer';
import { useRouter } from 'next/router';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const { data, loading } = useMyAccountQuery({
    skip: isServer(),
  });
  const [logout, { loading: logoutFetch }] = useLogOutMutation();
  const apolloClient = useApolloClient();

  const logOutHandler = () => {
    logout();
    apolloClient.clearStore().then(() => {
      apolloClient.resetStore();
      router.push('/login');
    });
  };

  let body;
  if (isServer() || loading) {
  } else if (!data?.myAccount) {
    body = (
      <>
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Flex columnGap="15px" alignItems="center">
          <NextLink href="/">
            <Link>Home</Link>
          </NextLink>
          <NextLink href="/profile">
            <Link>Profile</Link>
          </NextLink>
          <Box mr={2}>{data?.myAccount?.username}</Box>
          <Button
            onClick={logOutHandler}
            variant="solid"
            colorScheme="messenger"
            isLoading={logoutFetch}
          >
            logout
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <Box bg="white" boxShadow="xl" padding="15px 0">
      <Flex w="800px" m="auto" justifyContent="space-between" align="center">
        <Box fontSize="18px">Logo</Box>
        <Flex align="center" columnGap="15px">
          {/* {!data ? (<NextLink href="/register"> <Link>Register</Link> <NextLink/>) :  (<Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />)} */}
          {body}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
