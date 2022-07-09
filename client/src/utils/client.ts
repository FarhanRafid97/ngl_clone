import { ApolloClient, InMemoryCache } from '@apollo/client';
import { AllMessageQuery, MyAccountQuery } from '../generated/graphql';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',

  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allMessage: {
            keyArgs: [],
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
