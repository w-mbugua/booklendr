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
    "\nquery CurrentUser {\n  currentUser {\n    email\n    phoneNumber\n    username\n    books {\n      title\n      tags {\n        name\n      }\n      status\n      author {\n        name\n      }\n      loans {\n        borrower {\n          username\n          phoneNumber\n          email\n        }\n        createdAt\n        returnDate\n        book {\n          title\n          id\n        }\n      }\n      reservations {\n        reserver {\n          username\n          phoneNumber\n          email\n        }\n        status\n        createdAt\n        updatedAt\n        book {\n          title\n          id\n        }\n      }\n    }\n    id\n  }\n}\n": types.CurrentUserDocument,
    "\nmutation loginUser($username: String!, $password: String!) {\n\tlogin(loginInput: { username: $username, password: $password }) {\n\t  member {\n\t\tusername\n\t\tphoneNumber\n\t  }\n\t  error {\n\t\tmessage\n\t  }\n\t}\n  }\n": types.LoginUserDocument,
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
export function graphql(source: "\nquery CurrentUser {\n  currentUser {\n    email\n    phoneNumber\n    username\n    books {\n      title\n      tags {\n        name\n      }\n      status\n      author {\n        name\n      }\n      loans {\n        borrower {\n          username\n          phoneNumber\n          email\n        }\n        createdAt\n        returnDate\n        book {\n          title\n          id\n        }\n      }\n      reservations {\n        reserver {\n          username\n          phoneNumber\n          email\n        }\n        status\n        createdAt\n        updatedAt\n        book {\n          title\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"): (typeof documents)["\nquery CurrentUser {\n  currentUser {\n    email\n    phoneNumber\n    username\n    books {\n      title\n      tags {\n        name\n      }\n      status\n      author {\n        name\n      }\n      loans {\n        borrower {\n          username\n          phoneNumber\n          email\n        }\n        createdAt\n        returnDate\n        book {\n          title\n          id\n        }\n      }\n      reservations {\n        reserver {\n          username\n          phoneNumber\n          email\n        }\n        status\n        createdAt\n        updatedAt\n        book {\n          title\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation loginUser($username: String!, $password: String!) {\n\tlogin(loginInput: { username: $username, password: $password }) {\n\t  member {\n\t\tusername\n\t\tphoneNumber\n\t  }\n\t  error {\n\t\tmessage\n\t  }\n\t}\n  }\n"): (typeof documents)["\nmutation loginUser($username: String!, $password: String!) {\n\tlogin(loginInput: { username: $username, password: $password }) {\n\t  member {\n\t\tusername\n\t\tphoneNumber\n\t  }\n\t  error {\n\t\tmessage\n\t  }\n\t}\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;