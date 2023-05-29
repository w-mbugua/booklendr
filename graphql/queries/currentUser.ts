import { graphql } from '@/generated/gql';

const currentUser = graphql(`
  query CurrentUser {
    currentUser {
      ...userFields
    }
  }
`);
