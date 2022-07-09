import { withApollo } from 'next-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { AllMessageQuery, AllUserQuery } from '../generated/graphql';

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            message: {
              keyArgs: [],
              merge(
                existing: AllMessageQuery | undefined,
                incoming: AllMessageQuery
              ): AllMessageQuery | null {
                console.log('posts apollo exist', existing);
                console.log('posts apollo incoming', incoming);
                // return {
                //   ...incoming,
                //   allMessage: [
                //     ...(existing?.allMessage || []),
                //     ...incoming.allMessage,
                //   ],
                // };
                return null;
              },
            },
          },
        },
      },
    }),
  });
export default withApollo(createClient);
