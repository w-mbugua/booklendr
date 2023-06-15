import { graphql } from '@/generated/gql';

const BORROW_BOOK = graphql(`
  mutation BORROW_BOOK($borrowId: Float!) {
    borrow(id: $borrowId) {
      message
      book {
        title
        status
        loans {
          status
          returnDate
          borrower {
            id
          }
        }
      }
    }
  }
`);
