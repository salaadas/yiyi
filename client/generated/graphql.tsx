import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  important: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['Int'];
};

export type MessageInput = {
  content: Scalars['String'];
  important: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Message;
  deleteMessage: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateMessage?: Maybe<Message>;
};


export type MutationCreateMessageArgs = {
  input: MessageInput;
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateMessageArgs = {
  id: Scalars['Float'];
  input: MessageInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  message?: Maybe<Message>;
  messages: Array<Message>;
  user?: Maybe<User>;
};


export type QueryMessageArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageSent: Message;
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UserCount = {
  __typename?: 'UserCount';
  messages: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreateMessageMutationVariables = Exact<{
  input: MessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: number, createdAt: any, updatedAt: any, content: string, important: boolean, userId: number } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, email: string, name: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type UserQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', name: string } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, email: string, name: string } | null | undefined };

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: number, createdAt: any, updatedAt: any, content: string, important: boolean, userId: number }> };

export type MessageSentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageSentSubscription = { __typename?: 'Subscription', messageSent: { __typename?: 'Message', id: number, createdAt: any, updatedAt: any, content: string, important: boolean, userId: number } };


export const CreateMessageDocument = gql`
    mutation CreateMessage($input: MessageInput!) {
  createMessage(input: $input) {
    id
    createdAt
    updatedAt
    content
    important
    userId
  }
}
    `;

export function useCreateMessageMutation() {
  return Urql.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument);
};
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    errors {
      field
      message
    }
    user {
      id
      email
      name
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const UserDocument = gql`
    query User($userId: Float!) {
  user(id: $userId) {
    name
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    name
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MessagesDocument = gql`
    query Messages {
  messages {
    id
    createdAt
    updatedAt
    content
    important
    userId
  }
}
    `;

export function useMessagesQuery(options: Omit<Urql.UseQueryArgs<MessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MessagesQuery>({ query: MessagesDocument, ...options });
};
export const MessageSentDocument = gql`
    subscription MessageSent {
  messageSent {
    id
    createdAt
    updatedAt
    content
    important
    userId
  }
}
    `;

export function useMessageSentSubscription<TData = MessageSentSubscription>(options: Omit<Urql.UseSubscriptionArgs<MessageSentSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<MessageSentSubscription, TData>) {
  return Urql.useSubscription<MessageSentSubscription, TData, MessageSentSubscriptionVariables>({ query: MessageSentDocument, ...options }, handler);
};