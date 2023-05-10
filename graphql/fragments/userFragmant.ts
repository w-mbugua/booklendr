import { graphql } from '@/generated/gql';

const USER_FIELDS = graphql(`
  fragment userFields on Member {
    id
    email
    phoneNumber
    username
  }
`);
