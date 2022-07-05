import Layout from '../component/layouts/Layout';
import { Box, Heading, Text, Flex, Button, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Formik, Form } from 'formik';
import NextLink from 'next/link';
import InputField from '../component/Input/InputField';
import {
  MyAccountDocument,
  MyAccountQuery,
  useLoginUserMutation,
} from '../src/generated/graphql';
import { errorHandler } from '../src/utils/errorHandler';
interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginUserMutation();
  return (
    <Layout variant="main">
      <Box w="600px" margin="auto">
        <Heading fontWeight="medium" textAlign="center" mb={8}>
          Login
        </Heading>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            const response = await login({
              variables: values,
              update: (cache, { data }) => {
                cache.writeQuery<MyAccountQuery>({
                  query: MyAccountDocument,
                  data: {
                    __typename: 'Query',
                    myAccount: data?.loginUser.user,
                  },
                });
              },
            });
            console.log(response);
            // const response = await login({
            //   variables: values,
            //   update: (cache, { data }) => {
            //     cache.writeQuery<MyBioQuery>({
            //       query: MyBioDocument,
            //       data: {
            //         __typename: 'Query',
            //         myBio: data?.loginUser.user,
            //       },
            //     });
            //     cache.evict({ fieldName: 'posts:{}' });
            //   },
            // });
            // console.log(response);
            if (response.data?.loginUser.error) {
              setErrors(errorHandler(response.data.loginUser.error));
            } else if (response.data?.loginUser.user) {
              if (typeof router.query.next === 'string') {
                router.push(router.query.next);
              } else {
                router.push('/');
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="username" label="username" />
              <Box mt={5}>
                <InputField name="password" label="Password" type="password" />
              </Box>
              <Flex alignItems="center" mt={5} columnGap="15px">
                <Button
                  type="submit"
                  colorScheme="yellow"
                  isLoading={isSubmitting}
                >
                  Login
                </Button>
                <NextLink href="/forget-password">
                  <Link color="blue.500">Forget Password?</Link>
                </NextLink>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default Login;
