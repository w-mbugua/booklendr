import { graphql } from '@/generated/gql';

const OWNER_BOOKS = graphql(`
  query getBooksByOwner($ownerId: Float!) {
    getBooksByOwner(ownerId: $ownerId) {
      ...bookFields
    }
  }
`);
