import { graphql } from '@/generated/gql';

const LOAN_FIELDS = graphql(`
  fragment loanFields on Loan {
    lender {
      id
    }
    book {
      ...basicBookFields
    }
    borrower {
      ...userFields
    }
    createdAt
    id
    returnDate
    status
    updatedAt
    loanOverdue
  }
`);
