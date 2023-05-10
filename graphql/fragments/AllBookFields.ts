import { graphql } from '@/generated/gql';

const ALL_BOOK_FIELDS = graphql(`
  fragment bookFields on Book {
    ...basicBookFields
    owner {
      ...userFields
    }
    reservations {
      status
      reserver {
        id
      }
    }
    loans {
      status
      borrower {
        id
      }
    }
  }
`);
