import { graphql } from '@/generated/gql';

const BOOK_FIELDS = graphql(`
  fragment bookFields on Book {
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
      name
    }
    owner {
      id
      username
      phoneNumber
      email
    }
    reservations {
      createdAt
      status
      reserver {
        username
        email
      }
    }
    loans {
      returnDate
      borrower {
        username
      }
    }
    tags {
      name
    }
  }
`);
