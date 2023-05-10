import { graphql } from '@/generated/gql';

const RESERVATION_FIELDS = graphql(`
  fragment reservationFields on Reservation {
    lender {
      id
    }
    book {
      ...basicBookFields
    }
    reserver {
      ...userFields
    }
    createdAt
    id
    status
    updatedAt
    toBorrowDate
  }
`);
