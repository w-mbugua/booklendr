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
    "\n  fragment bookFields on Book {\n    ...basicBookFields\n    owner {\n      ...userFields\n    }\n    reservations {\n      status\n      reserver {\n        id\n      }\n    }\n    loans {\n      status\n      borrower {\n        id\n      }\n    }\n  }\n": types.BookFieldsFragmentDoc,
    "\n  fragment basicBookFields on Book {\n    id\n    title\n    subtitle\n    description\n    textSnippet\n    createdAt\n    cover\n    thumbnail\n    status\n    author {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n": types.BasicBookFieldsFragmentDoc,
    "\n  fragment loanFields on Loan {\n    lender {\n      id\n    }\n    book {\n      ...basicBookFields\n    }\n    borrower {\n      ...userFields\n    }\n    createdAt\n    id\n    returnDate\n    status\n    updatedAt\n    loanOverdue\n  }\n": types.LoanFieldsFragmentDoc,
    "\n  fragment messageFields on Message {\n    id\n    body\n    createdAt\n    sender {\n      id\n      username\n    }\n  }\n": types.MessageFieldsFragmentDoc,
    "\n  fragment reservationFields on Reservation {\n    lender {\n      id\n    }\n    book {\n      ...basicBookFields\n    }\n    reserver {\n      ...userFields\n    }\n    createdAt\n    id\n    status\n    updatedAt\n    toBorrowDate\n  }\n": types.ReservationFieldsFragmentDoc,
    "\n  fragment userFields on Member {\n    id\n    email\n    phoneNumber\n    username\n    unreadMessages\n  }\n": types.UserFieldsFragmentDoc,
    "\n  mutation AddBook($newBookData: NewBookInput!) {\n    addBook(newBookData: $newBookData) {\n      book {\n        ...bookFields\n      }\n      message\n    }\n  }\n": types.AddBookDocument,
    "\n  mutation BORROW_BOOK($borrowId: Float!) {\n    borrow(id: $borrowId) {\n      message\n      book {\n        title\n        status\n        loans {\n          status\n          returnDate\n          borrower {\n            id\n          }\n        }\n      }\n    }\n  }\n": types.Borrow_BookDocument,
    "\n  mutation createConversation($createConversationData: conversationsInput!) {\n    createConversation(createConversationData: $createConversationData) {\n      conversation {\n        id\n        createdAt\n        participants {\n          id\n          userId\n          hasSeenLatestMessage\n          updatedAt\n        }\n      }\n    }\n  }\n": types.CreateConversationDocument,
    "\n  mutation deleteBook($id: Float!) {\n    deleteBook(id: $id)\n  }\n": types.DeleteBookDocument,
    "\n  mutation loginUser($email: String, $phoneNumber: String, $password: String!) {\n    login(\n      loginInput: {\n        email: $email\n        phoneNumber: $phoneNumber\n        password: $password\n      }\n    ) {\n      member {\n        id\n        username\n        phoneNumber\n        email\n      }\n      error {\n        message\n      }\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation readConversation($conversationId: Float!) {\n    markConversationAsRead(conversationId: $conversationId) {\n      id\n      participants {\n        id\n        userId\n        hasSeenLatestMessage\n        updatedAt\n      }\n      createdAt\n    }\n  }\n": types.ReadConversationDocument,
    "\n  mutation readNotifications {\n    markNotificationsAsRead {\n      ...userFields\n    }\n  }\n": types.ReadNotificationsDocument,
    "\n  mutation Register($newMemberData: NewMemberInput!) {\n    register(newMemberData: $newMemberData) {\n      member {\n        username\n        phoneNumber\n        email\n        id\n      }\n      error {\n        message\n        field\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation RESERVE_BOOK($reserveId: Float!) {\n    reserve(id: $reserveId) {\n      message\n      book {\n        loans {\n          borrower {\n            username\n          }\n        }\n        reservations {\n          reserver {\n            username\n          }\n          status\n        }\n      }\n    }\n  }\n": types.Reserve_BookDocument,
    "\n  mutation sendMessage($messageData: MessageInput!) {\n    sendMessage(messageData: $messageData) {\n      body\n      id\n    }\n  }\n": types.SendMessageDocument,
    "\n  mutation updateBook($options: BookUpdateInput!, $cover: Upload) {\n    updateBook(options: $options, cover: $cover) {\n      ...bookFields\n    }\n  }\n": types.UpdateBookDocument,
    "\n  query conversations {\n    conversations {\n      id\n      createdAt\n      updatedAt\n      latestMessage {\n        ...messageFields\n      }\n      messages {\n        ...messageFields\n      }\n      participants {\n        userId\n        hasSeenLatestMessage\n        id\n      }\n    }\n  }\n": types.ConversationsDocument,
    "\n  query CurrentUser {\n    currentUser {\n      ...userFields\n    }\n  }\n": types.CurrentUserDocument,
    "\n  query GetBookById($BookId: Float!) {\n    getBookById(id: $BookId) {\n      ...bookFields\n    }\n  }\n": types.GetBookByIdDocument,
    "\n  query GetBooks {\n    getBooks {\n      ...bookFields\n    }\n  }\n": types.GetBooksDocument,
    "\n  query getBooksByOwner($ownerId: Float!) {\n    getBooksByOwner(ownerId: $ownerId) {\n      ...bookFields\n    }\n  }\n": types.GetBooksByOwnerDocument,
    "\n  query GET_LOANS {\n    loans {\n      book {\n        ...basicBookFields\n      }\n      ...loanFields\n    }\n  }\n": types.Get_LoansDocument,
    "\n  query GET_LOANS_BY_ID($lenderId: Float!) {\n    loansByLenderId(lenderId: $lenderId) {\n      book {\n        ...basicBookFields\n      }\n      ...loanFields\n    }\n  }\n": types.Get_Loans_By_IdDocument,
    "\n  query Messages($conversationId: Float!) {\n    messages(conversationId: $conversationId) {\n      id\n      createdAt\n      conversation {\n        id\n      }\n      body\n      sender {\n        username\n        id\n      }\n    }\n  }\n": types.MessagesDocument,
    "\n  query GET_LENDER_RESERVATIONS($lenderId: Float!) {\n    reservationsByLenderId(lenderId: $lenderId) {\n      ...reservationFields\n    }\n  }\n": types.Get_Lender_ReservationsDocument,
    "\n  query SEARCH_BOOKS($searchTerm: String!) {\n    searchBook(searchTerm: $searchTerm) {\n      id\n      title\n      cover\n    }\n  }\n": types.Search_BooksDocument,
    "\n  query GetTags {\n    getTags {\n      id\n      name\n      books {\n        ...basicBookFields\n        owner {\n          ...userFields\n        }\n      }\n    }\n  }\n": types.GetTagsDocument,
    "\n  subscription UpdatedConversation($conversationId: Float!) {\n    updatedConversation(conversationId: $conversationId) {\n      id\n      createdAt\n      updatedAt\n      messages {\n        id\n        body\n      }\n      latestMessage {\n        ...messageFields\n      }\n      participants {\n        userId\n        hasSeenLatestMessage\n        id\n      }\n    }\n  }\n": types.UpdatedConversationDocument,
    "\n  subscription messageSent($conversationId: Float!) {\n    messageSent(conversationId: $conversationId) {\n      id\n      body\n      createdAt\n      conversation {\n        id\n      }\n      sender {\n        id\n        username\n      }\n    }\n  }\n": types.MessageSentDocument,
    "\n  subscription notifications($userId: Float!) {\n    newNotification(userId: $userId) {\n      ...userFields\n    }\n  }\n": types.NotificationsDocument,
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
export function graphql(source: "\n  fragment bookFields on Book {\n    ...basicBookFields\n    owner {\n      ...userFields\n    }\n    reservations {\n      status\n      reserver {\n        id\n      }\n    }\n    loans {\n      status\n      borrower {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment bookFields on Book {\n    ...basicBookFields\n    owner {\n      ...userFields\n    }\n    reservations {\n      status\n      reserver {\n        id\n      }\n    }\n    loans {\n      status\n      borrower {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment basicBookFields on Book {\n    id\n    title\n    subtitle\n    description\n    textSnippet\n    createdAt\n    cover\n    thumbnail\n    status\n    author {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment basicBookFields on Book {\n    id\n    title\n    subtitle\n    description\n    textSnippet\n    createdAt\n    cover\n    thumbnail\n    status\n    author {\n      id\n      name\n    }\n    tags {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment loanFields on Loan {\n    lender {\n      id\n    }\n    book {\n      ...basicBookFields\n    }\n    borrower {\n      ...userFields\n    }\n    createdAt\n    id\n    returnDate\n    status\n    updatedAt\n    loanOverdue\n  }\n"): (typeof documents)["\n  fragment loanFields on Loan {\n    lender {\n      id\n    }\n    book {\n      ...basicBookFields\n    }\n    borrower {\n      ...userFields\n    }\n    createdAt\n    id\n    returnDate\n    status\n    updatedAt\n    loanOverdue\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment messageFields on Message {\n    id\n    body\n    createdAt\n    sender {\n      id\n      username\n    }\n  }\n"): (typeof documents)["\n  fragment messageFields on Message {\n    id\n    body\n    createdAt\n    sender {\n      id\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment reservationFields on Reservation {\n    lender {\n      id\n    }\n    book {\n      ...basicBookFields\n    }\n    reserver {\n      ...userFields\n    }\n    createdAt\n    id\n    status\n    updatedAt\n    toBorrowDate\n  }\n"): (typeof documents)["\n  fragment reservationFields on Reservation {\n    lender {\n      id\n    }\n    book {\n      ...basicBookFields\n    }\n    reserver {\n      ...userFields\n    }\n    createdAt\n    id\n    status\n    updatedAt\n    toBorrowDate\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment userFields on Member {\n    id\n    email\n    phoneNumber\n    username\n    unreadMessages\n  }\n"): (typeof documents)["\n  fragment userFields on Member {\n    id\n    email\n    phoneNumber\n    username\n    unreadMessages\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddBook($newBookData: NewBookInput!) {\n    addBook(newBookData: $newBookData) {\n      book {\n        ...bookFields\n      }\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation AddBook($newBookData: NewBookInput!) {\n    addBook(newBookData: $newBookData) {\n      book {\n        ...bookFields\n      }\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation BORROW_BOOK($borrowId: Float!) {\n    borrow(id: $borrowId) {\n      message\n      book {\n        title\n        status\n        loans {\n          status\n          returnDate\n          borrower {\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation BORROW_BOOK($borrowId: Float!) {\n    borrow(id: $borrowId) {\n      message\n      book {\n        title\n        status\n        loans {\n          status\n          returnDate\n          borrower {\n            id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createConversation($createConversationData: conversationsInput!) {\n    createConversation(createConversationData: $createConversationData) {\n      conversation {\n        id\n        createdAt\n        participants {\n          id\n          userId\n          hasSeenLatestMessage\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createConversation($createConversationData: conversationsInput!) {\n    createConversation(createConversationData: $createConversationData) {\n      conversation {\n        id\n        createdAt\n        participants {\n          id\n          userId\n          hasSeenLatestMessage\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBook($id: Float!) {\n    deleteBook(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteBook($id: Float!) {\n    deleteBook(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($email: String, $phoneNumber: String, $password: String!) {\n    login(\n      loginInput: {\n        email: $email\n        phoneNumber: $phoneNumber\n        password: $password\n      }\n    ) {\n      member {\n        id\n        username\n        phoneNumber\n        email\n      }\n      error {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($email: String, $phoneNumber: String, $password: String!) {\n    login(\n      loginInput: {\n        email: $email\n        phoneNumber: $phoneNumber\n        password: $password\n      }\n    ) {\n      member {\n        id\n        username\n        phoneNumber\n        email\n      }\n      error {\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation readConversation($conversationId: Float!) {\n    markConversationAsRead(conversationId: $conversationId) {\n      id\n      participants {\n        id\n        userId\n        hasSeenLatestMessage\n        updatedAt\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation readConversation($conversationId: Float!) {\n    markConversationAsRead(conversationId: $conversationId) {\n      id\n      participants {\n        id\n        userId\n        hasSeenLatestMessage\n        updatedAt\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation readNotifications {\n    markNotificationsAsRead {\n      ...userFields\n    }\n  }\n"): (typeof documents)["\n  mutation readNotifications {\n    markNotificationsAsRead {\n      ...userFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($newMemberData: NewMemberInput!) {\n    register(newMemberData: $newMemberData) {\n      member {\n        username\n        phoneNumber\n        email\n        id\n      }\n      error {\n        message\n        field\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($newMemberData: NewMemberInput!) {\n    register(newMemberData: $newMemberData) {\n      member {\n        username\n        phoneNumber\n        email\n        id\n      }\n      error {\n        message\n        field\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RESERVE_BOOK($reserveId: Float!) {\n    reserve(id: $reserveId) {\n      message\n      book {\n        loans {\n          borrower {\n            username\n          }\n        }\n        reservations {\n          reserver {\n            username\n          }\n          status\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RESERVE_BOOK($reserveId: Float!) {\n    reserve(id: $reserveId) {\n      message\n      book {\n        loans {\n          borrower {\n            username\n          }\n        }\n        reservations {\n          reserver {\n            username\n          }\n          status\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation sendMessage($messageData: MessageInput!) {\n    sendMessage(messageData: $messageData) {\n      body\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation sendMessage($messageData: MessageInput!) {\n    sendMessage(messageData: $messageData) {\n      body\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBook($options: BookUpdateInput!, $cover: Upload) {\n    updateBook(options: $options, cover: $cover) {\n      ...bookFields\n    }\n  }\n"): (typeof documents)["\n  mutation updateBook($options: BookUpdateInput!, $cover: Upload) {\n    updateBook(options: $options, cover: $cover) {\n      ...bookFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query conversations {\n    conversations {\n      id\n      createdAt\n      updatedAt\n      latestMessage {\n        ...messageFields\n      }\n      messages {\n        ...messageFields\n      }\n      participants {\n        userId\n        hasSeenLatestMessage\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query conversations {\n    conversations {\n      id\n      createdAt\n      updatedAt\n      latestMessage {\n        ...messageFields\n      }\n      messages {\n        ...messageFields\n      }\n      participants {\n        userId\n        hasSeenLatestMessage\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CurrentUser {\n    currentUser {\n      ...userFields\n    }\n  }\n"): (typeof documents)["\n  query CurrentUser {\n    currentUser {\n      ...userFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBookById($BookId: Float!) {\n    getBookById(id: $BookId) {\n      ...bookFields\n    }\n  }\n"): (typeof documents)["\n  query GetBookById($BookId: Float!) {\n    getBookById(id: $BookId) {\n      ...bookFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBooks {\n    getBooks {\n      ...bookFields\n    }\n  }\n"): (typeof documents)["\n  query GetBooks {\n    getBooks {\n      ...bookFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getBooksByOwner($ownerId: Float!) {\n    getBooksByOwner(ownerId: $ownerId) {\n      ...bookFields\n    }\n  }\n"): (typeof documents)["\n  query getBooksByOwner($ownerId: Float!) {\n    getBooksByOwner(ownerId: $ownerId) {\n      ...bookFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GET_LOANS {\n    loans {\n      book {\n        ...basicBookFields\n      }\n      ...loanFields\n    }\n  }\n"): (typeof documents)["\n  query GET_LOANS {\n    loans {\n      book {\n        ...basicBookFields\n      }\n      ...loanFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GET_LOANS_BY_ID($lenderId: Float!) {\n    loansByLenderId(lenderId: $lenderId) {\n      book {\n        ...basicBookFields\n      }\n      ...loanFields\n    }\n  }\n"): (typeof documents)["\n  query GET_LOANS_BY_ID($lenderId: Float!) {\n    loansByLenderId(lenderId: $lenderId) {\n      book {\n        ...basicBookFields\n      }\n      ...loanFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Messages($conversationId: Float!) {\n    messages(conversationId: $conversationId) {\n      id\n      createdAt\n      conversation {\n        id\n      }\n      body\n      sender {\n        username\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query Messages($conversationId: Float!) {\n    messages(conversationId: $conversationId) {\n      id\n      createdAt\n      conversation {\n        id\n      }\n      body\n      sender {\n        username\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GET_LENDER_RESERVATIONS($lenderId: Float!) {\n    reservationsByLenderId(lenderId: $lenderId) {\n      ...reservationFields\n    }\n  }\n"): (typeof documents)["\n  query GET_LENDER_RESERVATIONS($lenderId: Float!) {\n    reservationsByLenderId(lenderId: $lenderId) {\n      ...reservationFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SEARCH_BOOKS($searchTerm: String!) {\n    searchBook(searchTerm: $searchTerm) {\n      id\n      title\n      cover\n    }\n  }\n"): (typeof documents)["\n  query SEARCH_BOOKS($searchTerm: String!) {\n    searchBook(searchTerm: $searchTerm) {\n      id\n      title\n      cover\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTags {\n    getTags {\n      id\n      name\n      books {\n        ...basicBookFields\n        owner {\n          ...userFields\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTags {\n    getTags {\n      id\n      name\n      books {\n        ...basicBookFields\n        owner {\n          ...userFields\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription UpdatedConversation($conversationId: Float!) {\n    updatedConversation(conversationId: $conversationId) {\n      id\n      createdAt\n      updatedAt\n      messages {\n        id\n        body\n      }\n      latestMessage {\n        ...messageFields\n      }\n      participants {\n        userId\n        hasSeenLatestMessage\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription UpdatedConversation($conversationId: Float!) {\n    updatedConversation(conversationId: $conversationId) {\n      id\n      createdAt\n      updatedAt\n      messages {\n        id\n        body\n      }\n      latestMessage {\n        ...messageFields\n      }\n      participants {\n        userId\n        hasSeenLatestMessage\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription messageSent($conversationId: Float!) {\n    messageSent(conversationId: $conversationId) {\n      id\n      body\n      createdAt\n      conversation {\n        id\n      }\n      sender {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription messageSent($conversationId: Float!) {\n    messageSent(conversationId: $conversationId) {\n      id\n      body\n      createdAt\n      conversation {\n        id\n      }\n      sender {\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription notifications($userId: Float!) {\n    newNotification(userId: $userId) {\n      ...userFields\n    }\n  }\n"): (typeof documents)["\n  subscription notifications($userId: Float!) {\n    newNotification(userId: $userId) {\n      ...userFields\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;