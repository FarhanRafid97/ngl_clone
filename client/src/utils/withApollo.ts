import withApollo from './createWithApollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { AllUserQuery } from '../generated/graphql';

const createClient = (ctx: NextPageContext | undefined) =>
  new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache(),
  });
export default withApollo(createClient);
