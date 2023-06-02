import { graphql } from '@/generated/gql';

const READ_CONVERSATION = graphql(`
  mutation readConversation($conversationId: Float!) {
    markConversationAsRead(conversationId: $conversationId) {
      id
      participants {
        id
        userId
        hasSeenLatestMessage
        updatedAt
      }
      createdAt
    }
  }
`);
