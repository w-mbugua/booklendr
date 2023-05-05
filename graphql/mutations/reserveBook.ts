import { graphql } from '@/generated/gql';

const RESERVE_BOOK = graphql(`
  mutation RESERVE_BOOK($reserveId: Float!) {
    reserve(id: $reserveId) {
      message
      book {
        loans {
          borrower {
            username
          }
        }
        reservations {
          reserver {
            username
          }
          status
        }
      }
    }
  }
`);
