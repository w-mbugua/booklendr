import {
  CurrentUserQuery,
  GetBooksQuery,
  Get_Loans_By_IdQuery
} from './generated/gql/graphql';

export type Book = GetBooksQuery['getBooks'][0];
export type CurrentUser = CurrentUserQuery['currentUser'];
export type loan = Get_Loans_By_IdQuery['loansByLenderId'][0];
export type Borrower = loan['borrower'];
