import { graphql } from '@/generated/gql';

const SEARCH_BOOKS = graphql(`
  query SEARCH_BOOKS($searchTerm: String!) {
    searchBook(searchTerm: $searchTerm) {
      id
      title
      cover
    }
  }
`);
