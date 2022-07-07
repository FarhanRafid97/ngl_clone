import Layout from '../component/layouts/Layout';
import NextLink from 'next/link';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import { useMyAccountQuery } from '../src/generated/graphql';
interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { data } = useMyAccountQuery();
  return (
    <Layout variant={'main'} headTitle={'Profile'}>
      <Box pt={8}>
        <Heading textAlign="center">{data?.myAccount?.username}</Heading>

        <NextLink href={`/question`}>
          <Link>My Question</Link>
        </NextLink>
        <Box>
          <NextLink href={`/question/${data?.myAccount?.username}`}>
            <Link>My Question Form</Link>
          </NextLink>
        </Box>
      </Box>
    </Layout>
  );
};

export default Profile;
