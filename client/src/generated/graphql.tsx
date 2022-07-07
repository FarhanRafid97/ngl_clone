import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  message: Scalars['String'];
  opened: Scalars['Boolean'];
  receiver: User;
  receiverId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserResponse;
  logOut: Scalars['Boolean'];
  loginUser: UserResponse;
  openedMessage: Message;
  sendMessage: Message;
};


export type MutationCreateUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationOpenedMessageArgs = {
  id: Scalars['Int'];
  opened: Scalars['Boolean'];
};


export type MutationSendMessageArgs = {
  message: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allMessage?: Maybe<Array<Message>>;
  allUser?: Maybe<Array<User>>;
  message?: Maybe<Message>;
  myAccount?: Maybe<User>;
};


export type QueryMessageArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  messages: Array<Message>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: boolean };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null, user?: { __typename?: 'User', id: number, username: string } | null } };

export type OpenedMessageMutationVariables = Exact<{
  opened: Scalars['Boolean'];
  id: Scalars['Int'];
}>;


export type OpenedMessageMutation = { __typename?: 'Mutation', openedMessage: { __typename?: 'Message', opened: boolean, message: string, id: number, receiverId: number } };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: number, username: string, createdAt: any } | null, error?: { __typename?: 'FieldError', field: string, message: string } | null } };

export type SendMessageMutationVariables = Exact<{
  username: Scalars['String'];
  message: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: number, receiverId: number, message: string, opened: boolean } };

export type AllMessageQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMessageQuery = { __typename?: 'Query', allMessage?: Array<{ __typename?: 'Message', id: number, receiverId: number, message: string, opened: boolean }> | null };

export type AllUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUserQuery = { __typename?: 'Query', allUser?: Array<{ __typename?: 'User', id: number, username: string }> | null };

export type MessageQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MessageQuery = { __typename?: 'Query', message?: { __typename?: 'Message', message: string } | null };

export type MyAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAccountQuery = { __typename?: 'Query', myAccount?: { __typename?: 'User', id: number, username: string } | null };

export type MyQuestionQueryVariables = Exact<{ [key: string]: never; }>;


export type MyQuestionQuery = { __typename?: 'Query', myAccount?: { __typename?: 'User', id: number, username: string, messages: Array<{ __typename?: 'Message', id: number, receiverId: number, message: string, opened: boolean }> } | null };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    error {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const OpenedMessageDocument = gql`
    mutation OpenedMessage($opened: Boolean!, $id: Int!) {
  openedMessage(opened: $opened, id: $id) {
    opened
    message
    id
    receiverId
  }
}
    `;
export type OpenedMessageMutationFn = Apollo.MutationFunction<OpenedMessageMutation, OpenedMessageMutationVariables>;

/**
 * __useOpenedMessageMutation__
 *
 * To run a mutation, you first call `useOpenedMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenedMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openedMessageMutation, { data, loading, error }] = useOpenedMessageMutation({
 *   variables: {
 *      opened: // value for 'opened'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOpenedMessageMutation(baseOptions?: Apollo.MutationHookOptions<OpenedMessageMutation, OpenedMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OpenedMessageMutation, OpenedMessageMutationVariables>(OpenedMessageDocument, options);
      }
export type OpenedMessageMutationHookResult = ReturnType<typeof useOpenedMessageMutation>;
export type OpenedMessageMutationResult = Apollo.MutationResult<OpenedMessageMutation>;
export type OpenedMessageMutationOptions = Apollo.BaseMutationOptions<OpenedMessageMutation, OpenedMessageMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    user {
      id
      username
      createdAt
    }
    error {
      field
      message
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($username: String!, $message: String!) {
  sendMessage(username: $username, message: $message) {
    id
    receiverId
    message
    opened
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      username: // value for 'username'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const AllMessageDocument = gql`
    query AllMessage {
  allMessage {
    id
    receiverId
    message
    opened
  }
}
    `;

/**
 * __useAllMessageQuery__
 *
 * To run a query within a React component, call `useAllMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllMessageQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllMessageQuery(baseOptions?: Apollo.QueryHookOptions<AllMessageQuery, AllMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllMessageQuery, AllMessageQueryVariables>(AllMessageDocument, options);
      }
export function useAllMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllMessageQuery, AllMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllMessageQuery, AllMessageQueryVariables>(AllMessageDocument, options);
        }
export type AllMessageQueryHookResult = ReturnType<typeof useAllMessageQuery>;
export type AllMessageLazyQueryHookResult = ReturnType<typeof useAllMessageLazyQuery>;
export type AllMessageQueryResult = Apollo.QueryResult<AllMessageQuery, AllMessageQueryVariables>;
export const AllUserDocument = gql`
    query AllUser {
  allUser {
    id
    username
  }
}
    `;

/**
 * __useAllUserQuery__
 *
 * To run a query within a React component, call `useAllUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUserQuery(baseOptions?: Apollo.QueryHookOptions<AllUserQuery, AllUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUserQuery, AllUserQueryVariables>(AllUserDocument, options);
      }
export function useAllUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUserQuery, AllUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUserQuery, AllUserQueryVariables>(AllUserDocument, options);
        }
export type AllUserQueryHookResult = ReturnType<typeof useAllUserQuery>;
export type AllUserLazyQueryHookResult = ReturnType<typeof useAllUserLazyQuery>;
export type AllUserQueryResult = Apollo.QueryResult<AllUserQuery, AllUserQueryVariables>;
export const MessageDocument = gql`
    query Message($id: Int!) {
  message(id: $id) {
    message
  }
}
    `;

/**
 * __useMessageQuery__
 *
 * To run a query within a React component, call `useMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMessageQuery(baseOptions: Apollo.QueryHookOptions<MessageQuery, MessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessageQuery, MessageQueryVariables>(MessageDocument, options);
      }
export function useMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessageQuery, MessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessageQuery, MessageQueryVariables>(MessageDocument, options);
        }
export type MessageQueryHookResult = ReturnType<typeof useMessageQuery>;
export type MessageLazyQueryHookResult = ReturnType<typeof useMessageLazyQuery>;
export type MessageQueryResult = Apollo.QueryResult<MessageQuery, MessageQueryVariables>;
export const MyAccountDocument = gql`
    query MyAccount {
  myAccount {
    id
    username
  }
}
    `;

/**
 * __useMyAccountQuery__
 *
 * To run a query within a React component, call `useMyAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyAccountQuery(baseOptions?: Apollo.QueryHookOptions<MyAccountQuery, MyAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyAccountQuery, MyAccountQueryVariables>(MyAccountDocument, options);
      }
export function useMyAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAccountQuery, MyAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyAccountQuery, MyAccountQueryVariables>(MyAccountDocument, options);
        }
export type MyAccountQueryHookResult = ReturnType<typeof useMyAccountQuery>;
export type MyAccountLazyQueryHookResult = ReturnType<typeof useMyAccountLazyQuery>;
export type MyAccountQueryResult = Apollo.QueryResult<MyAccountQuery, MyAccountQueryVariables>;
export const MyQuestionDocument = gql`
    query MyQuestion {
  myAccount {
    id
    username
    messages {
      id
      receiverId
      message
      opened
    }
  }
}
    `;

/**
 * __useMyQuestionQuery__
 *
 * To run a query within a React component, call `useMyQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyQuestionQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyQuestionQuery(baseOptions?: Apollo.QueryHookOptions<MyQuestionQuery, MyQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyQuestionQuery, MyQuestionQueryVariables>(MyQuestionDocument, options);
      }
export function useMyQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyQuestionQuery, MyQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyQuestionQuery, MyQuestionQueryVariables>(MyQuestionDocument, options);
        }
export type MyQuestionQueryHookResult = ReturnType<typeof useMyQuestionQuery>;
export type MyQuestionLazyQueryHookResult = ReturnType<typeof useMyQuestionLazyQuery>;
export type MyQuestionQueryResult = Apollo.QueryResult<MyQuestionQuery, MyQuestionQueryVariables>;