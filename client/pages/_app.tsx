import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { AllMessageQuery } from '../src/generated/graphql';

const client = new ApolloClient({
  credentials: 'include',
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allMessage: {
            keyArgs: ['id'],
            merge(
              existing: AllMessageQuery | undefined,
              incoming: AllMessageQuery
            ): AllMessageQuery | null {
              console.log('posts apollo exist', existing);
              console.log('posts apollo incoming', incoming);
              return {
                ...incoming,
                allMessage: [
                  ...(existing?.allMessage || []),
                  ...(incoming.allMessage || []),
                ],
              };
            },
          },
        },
      },
    },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
