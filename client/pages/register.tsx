import { Box, Button, Flex, Heading, Link, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../component/Input/InputField';
import Layout from '../component/layouts/Layout';
import NextLink from 'next/link';
import {
  MyAccountDocument,
  MyAccountQuery,
  useCreateUserMutation,
} from '../src/generated/graphql';
import { errorHandler } from '../src/utils/errorHandler';
import { useRouter } from 'next/router';
import withApollo from '../src/utils/createWithApollo';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const toast = useToast();
  const router = useRouter();
  const [register] = useCreateUserMutation();

  return (
    <Layout variant="main" headTitle={'Register Page'}>
      <Box w="600px" margin="auto">
        <Heading
          fontWeight="medium"
          textAlign="center"
          p="10px"
          bg="white"
          borderRadius="10px"
          border="1px solid #dbdbdb"
          mb={4}
        >
          Register
        </Heading>
        <Box p="30px" bg="white" borderRadius="10px" border="1px solid #dbdbdb">
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await register({
                variables: values,
                update: (cache, { data }) => {
                  cache.writeQuery<MyAccountQuery>({
                    query: MyAccountDocument,
                    data: {
                      __typename: 'Query',
                      myAccount: data?.createUser.user,
                    },
                  });
                },
              });
              console.log(response);
              if (response.data?.createUser.error) {
                setErrors(errorHandler(response.data.createUser.error));
              } else if (response.data?.createUser.user) {
                if (typeof router.query.next === 'string') {
                  router.push(router.query.next);
                } else {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    position: 'top',
                    colorScheme: 'telegram',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  });
                  router.push('/');
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="username" label="username" />
                <Box mt={5}>
                  <InputField
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Box>
                <Flex alignItems="center" mt={5} columnGap="15px">
                  <Button
                    type="submit"
                    colorScheme="messenger"
                    isLoading={isSubmitting}
                  >
                    Register
                  </Button>
                  <NextLink href="/forget-password">
                    <Link color="blue.500">Forget Password?</Link>
                  </NextLink>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Layout>
  );
};

export default Register;
