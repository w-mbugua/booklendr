import { graphql } from '@/generated/gql';

const MESSAGES = graphql(`
  query Messages($conversationId: Float!) {
    messages(conversationId: $conversationId) {
      id
	  createdAt
      conversation {
        id
      }
      body
      sender {
        username
        id
      }
    }
  }
`);
