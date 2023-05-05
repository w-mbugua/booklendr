import { graphql } from '@/generated/gql';

const GET_BOOK_BY_ID = graphql(`
  query GetBookById($BookId: Float!) {
    getBookById(id: $BookId) {
      ...bookFields
    }
  }
`);
