import { graphql } from '@/generated/gql';

const GET_LOANS_BY_ID = graphql(`
  query GET_LOANS_BY_ID($lenderId: Float!) {
    loansByLenderId(lenderId: $lenderId) {
      book {
        ...basicBookFields
      }
      ...loanFields
    }
  }
`);
