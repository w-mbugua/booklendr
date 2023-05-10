import { graphql } from '@/generated/gql';

const GET_LOANS = graphql(`
  query GET_LOANS {
    loans {
      book {
        ...basicBookFields
      }
      ...loanFields
    }
  }
`);
