import { graphql } from '@/generated/gql';
import { BookFieldsFragmentDoc } from '@/generated/gql/graphql';

const addBook = graphql(`
  mutation AddBook($newBookData: NewBookInput!) {
    addBook(newBookData: $newBookData) {
      book {
        ...bookFields
      }
      message
    }
  }
`);
