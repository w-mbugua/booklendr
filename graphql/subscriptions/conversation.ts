import { graphql } from '@/generated/gql';

const CONVERSATION_UPDATED = graphql(`
  subscription UpdatedConversation($conversationId: Float!) {
    updatedConversation(conversationId: $conversationId) {
      id
      createdAt
      updatedAt
      messages {
        id
        body
      }
      latestMessage {
        ...messageFields
      }
      participants {
        userId
        hasSeenLatestMessage
        id
      }
    }
  }
`);
