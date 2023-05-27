import { graphql } from '@/generated/gql';

const MESSAGE_SENT = graphql(`
  subscription messageSent($conversationId: Float!) {
    messageSent(conversationId: $conversationId) {
      id
      createdAt
      conversation {
        id
      }
      body
    }
  }
`);
