import { graphql } from '@/generated/gql';

const tags = graphql(`
  query GetTags {
    getTags {
      id
      name
      books {
        ...basicBookFields
        owner {
          ...userFields
        }
      }
    }
  }
`);
