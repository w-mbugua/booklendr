import { graphql } from '@/generated/gql';

const register = graphql(`
  mutation Register($newMemberData: NewMemberInput!) {
    register(newMemberData: $newMemberData) {
      member {
        username
        phoneNumber
        email
        id
      }
      error {
        message
        field
      }
    }
  }
`);
