import { graphql } from '@/generated/gql';

const BASIC_BOOK_FIELDS = graphql(`
  fragment basicBookFields on Book {
    id
    title
    subtitle
    description
    textSnippet
    createdAt
    cover
    thumbnail
    status
    author {
      id
      name
    }
    tags {
      id
      name
    }
  }
`);
