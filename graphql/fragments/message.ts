import { graphql } from '@/generated/gql';

const MESSAGE_FIELDS = graphql(`
  fragment messageFields on Message {
    id
    body
    createdAt
    sender {
      id
      username
    }
  }
`);
