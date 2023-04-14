/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type Author = {
  __typename?: 'Author';
  books: Array<Book>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Book = {
  __typename?: 'Book';
  author: Author;
  cover: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Float'];
  loans: Array<Loan>;
  owner: Member;
  reservations: Array<Reservation>;
  status?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  tags: Array<Tag>;
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BookResponse = {
  __typename?: 'BookResponse';
  book?: Maybe<Book>;
  message?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Loan = {
  __typename?: 'Loan';
  book: Book;
  borrower: Member;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  returnDate: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};

export type Member = {
  __typename?: 'Member';
  books: Array<Book>;
  email: Scalars['String'];
  id: Scalars['Float'];
  phoneNumber: Scalars['String'];
  username: Scalars['String'];
};

export type MemberResponse = {
  __typename?: 'MemberResponse';
  error?: Maybe<Array<FieldError>>;
  member?: Maybe<Member>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAuthor: Author;
  addBook: Book;
  borrow: BookResponse;
  changePassword: Member;
  deleteBook: Scalars['Int'];
  forgotPassword: Scalars['Boolean'];
  login: MemberResponse;
  logout: Scalars['Boolean'];
  register: MemberResponse;
  reserve: BookResponse;
  updateBook: Book;
};


export type MutationAddAuthorArgs = {
  name: Scalars['String'];
};


export type MutationAddBookArgs = {
  newBookData: NewBookInput;
};


export type MutationBorrowArgs = {
  id: Scalars['Float'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationDeleteBookArgs = {
  id: Scalars['Float'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  newMemberData: NewMemberInput;
};


export type MutationReserveArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateBookArgs = {
  newTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type NewBookInput = {
  author: Scalars['String'];
  tag: Scalars['String'];
  title: Scalars['String'];
};

export type NewMemberInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: Member;
  getAuthors: Array<Author>;
  getBookById: Book;
  getBooks: Array<Book>;
  getTags: Array<Author>;
};


export type QueryGetBookByIdArgs = {
  id: Scalars['Float'];
};

export type Reservation = {
  __typename?: 'Reservation';
  book: Book;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  reserver: Member;
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Tag = {
  __typename?: 'Tag';
  books: Array<Book>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type AddBookMutationVariables = Exact<{
  newBookData: NewBookInput;
}>;


export type AddBookMutation = { __typename?: 'Mutation', addBook: { __typename?: 'Book', id: number, title: string, status?: string | null, tags: Array<{ __typename?: 'Tag', name: string }>, author: { __typename?: 'Author', name: string, id: number } } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'Member', id: number, email: string, phoneNumber: string, username: string, books: Array<{ __typename?: 'Book', title: string, status?: string | null, tags: Array<{ __typename?: 'Tag', name: string }>, author: { __typename?: 'Author', name: string }, loans: Array<{ __typename?: 'Loan', createdAt: any, returnDate: any, borrower: { __typename?: 'Member', username: string, phoneNumber: string, email: string }, book: { __typename?: 'Book', title: string, id: number } }>, reservations: Array<{ __typename?: 'Reservation', status: string, createdAt: any, updatedAt: any, reserver: { __typename?: 'Member', username: string, phoneNumber: string, email: string }, book: { __typename?: 'Book', title: string, id: number } }> }> } };

export type GetBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksQuery = { __typename?: 'Query', getBooks: Array<{ __typename?: 'Book', id: number, title: string, subtitle?: string | null, description: string, textSnippet: string, cover: string, status?: string | null, author: { __typename?: 'Author', name: string }, owner: { __typename?: 'Member', id: number, username: string, phoneNumber: string, email: string }, reservations: Array<{ __typename?: 'Reservation', createdAt: any, status: string, reserver: { __typename?: 'Member', username: string, email: string } }>, loans: Array<{ __typename?: 'Loan', returnDate: any, borrower: { __typename?: 'Member', username: string } }>, tags: Array<{ __typename?: 'Tag', name: string }> }> };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'MemberResponse', member?: { __typename?: 'Member', username: string, phoneNumber: string } | null, error?: Array<{ __typename?: 'FieldError', message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };


export const AddBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newBookData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewBookInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newBookData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newBookData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddBookMutation, AddBookMutationVariables>;
export const CurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"loans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"borrower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"returnDate"}},{"kind":"Field","name":{"kind":"Name","value":"book"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"reservations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reserver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"book"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetBooksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBooks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"textSnippet"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reservations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"reserver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"loans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returnDate"}},{"kind":"Field","name":{"kind":"Name","value":"borrower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetBooksQuery, GetBooksQueryVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;