/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddBook($newBookData: NewBookInput!) {\n    addBook(newBookData: $newBookData) {\n      id\n      title\n      status\n      tags {\n        name\n      }\n      author {\n        name\n        id\n      }\n    }\n  }\n": types.AddBookDocument,
    "\nmutation loginUser($email: String, $phoneNumber: String, $password: String!) {\n\tlogin(loginInput: { email: $email, phoneNumber: $phoneNumber, password: $password }) {\n\t  member {\n\t\tid\n\t\tusername\n\t\tphoneNumber\n\t\temail\n\t  }\n\t  error {\n\t\tmessage\n\t  }\n\t}\n  }\n": types.LoginUserDocument,
    "\n  mutation Logout {\n\tlogout\n  }\n": types.LogoutDocument,
    "\n  mutation Register($newMemberData: NewMemberInput!) {\n    register(newMemberData: $newMemberData) {\n      member {\n        username\n        phoneNumber\n        email\n        id\n      }\n      error {\n        message\n        field\n      }\n    }\n  }\n": types.RegisterDocument,
    "\nquery CurrentUser {\n  currentUser {\n    id\n    email\n    phoneNumber\n    username\n    books {\n      title\n      tags {\n        name\n      }\n      status\n      author {\n        name\n      }\n      loans {\n        borrower {\n          username\n          phoneNumber\n          email\n        }\n        createdAt\n        returnDate\n        book {\n          title\n          id\n        }\n      }\n      reservations {\n        reserver {\n          username\n          phoneNumber\n          email\n        }\n        status\n        createdAt\n        updatedAt\n        book {\n          title\n          id\n        }\n      }\n    }\n  }\n}\n": types.CurrentUserDocument,
    "\n  query GetBooks {\n    getBooks {\n      id\n      title\n      subtitle\n      description\n      textSnippet\n      createdAt\n      cover\n      thumbnail\n      status\n      author {\n        name\n      }\n      owner {\n        id\n        username\n        phoneNumber\n        email\n      }\n      reservations {\n        createdAt\n        status\n        reserver {\n          username\n          email\n        }\n      }\n      loans {\n        returnDate\n        borrower {\n          username\n        }\n      }\n      tags {\n        name\n      }\n    }\n  }\n": types.GetBooksDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddBook($newBookData: NewBookInput!) {\n    addBook(newBookData: $newBookData) {\n      id\n      title\n      status\n      tags {\n        name\n      }\n      author {\n        name\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddBook($newBookData: NewBookInput!) {\n    addBook(newBookData: $newBookData) {\n      id\n      title\n      status\n      tags {\n        name\n      }\n      author {\n        name\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation loginUser($email: String, $phoneNumber: String, $password: String!) {\n\tlogin(loginInput: { email: $email, phoneNumber: $phoneNumber, password: $password }) {\n\t  member {\n\t\tid\n\t\tusername\n\t\tphoneNumber\n\t\temail\n\t  }\n\t  error {\n\t\tmessage\n\t  }\n\t}\n  }\n"): (typeof documents)["\nmutation loginUser($email: String, $phoneNumber: String, $password: String!) {\n\tlogin(loginInput: { email: $email, phoneNumber: $phoneNumber, password: $password }) {\n\t  member {\n\t\tid\n\t\tusername\n\t\tphoneNumber\n\t\temail\n\t  }\n\t  error {\n\t\tmessage\n\t  }\n\t}\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n\tlogout\n  }\n"): (typeof documents)["\n  mutation Logout {\n\tlogout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($newMemberData: NewMemberInput!) {\n    register(newMemberData: $newMemberData) {\n      member {\n        username\n        phoneNumber\n        email\n        id\n      }\n      error {\n        message\n        field\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($newMemberData: NewMemberInput!) {\n    register(newMemberData: $newMemberData) {\n      member {\n        username\n        phoneNumber\n        email\n        id\n      }\n      error {\n        message\n        field\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery CurrentUser {\n  currentUser {\n    id\n    email\n    phoneNumber\n    username\n    books {\n      title\n      tags {\n        name\n      }\n      status\n      author {\n        name\n      }\n      loans {\n        borrower {\n          username\n          phoneNumber\n          email\n        }\n        createdAt\n        returnDate\n        book {\n          title\n          id\n        }\n      }\n      reservations {\n        reserver {\n          username\n          phoneNumber\n          email\n        }\n        status\n        createdAt\n        updatedAt\n        book {\n          title\n          id\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery CurrentUser {\n  currentUser {\n    id\n    email\n    phoneNumber\n    username\n    books {\n      title\n      tags {\n        name\n      }\n      status\n      author {\n        name\n      }\n      loans {\n        borrower {\n          username\n          phoneNumber\n          email\n        }\n        createdAt\n        returnDate\n        book {\n          title\n          id\n        }\n      }\n      reservations {\n        reserver {\n          username\n          phoneNumber\n          email\n        }\n        status\n        createdAt\n        updatedAt\n        book {\n          title\n          id\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBooks {\n    getBooks {\n      id\n      title\n      subtitle\n      description\n      textSnippet\n      createdAt\n      cover\n      thumbnail\n      status\n      author {\n        name\n      }\n      owner {\n        id\n        username\n        phoneNumber\n        email\n      }\n      reservations {\n        createdAt\n        status\n        reserver {\n          username\n          email\n        }\n      }\n      loans {\n        returnDate\n        borrower {\n          username\n        }\n      }\n      tags {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBooks {\n    getBooks {\n      id\n      title\n      subtitle\n      description\n      textSnippet\n      createdAt\n      cover\n      thumbnail\n      status\n      author {\n        name\n      }\n      owner {\n        id\n        username\n        phoneNumber\n        email\n      }\n      reservations {\n        createdAt\n        status\n        reserver {\n          username\n          email\n        }\n      }\n      loans {\n        returnDate\n        borrower {\n          username\n        }\n      }\n      tags {\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;