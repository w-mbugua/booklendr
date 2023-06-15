import { graphql } from '@/generated/gql';

const getAllBooks = graphql(`
  query GetBooks {
    getBooks {
      ...bookFields
    }
  }
`);
