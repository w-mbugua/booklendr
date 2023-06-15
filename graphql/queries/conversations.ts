import { graphql } from '@/generated/gql';

const CONVERSATIONS = graphql(`
  query conversations {
    conversations {
      id
      createdAt
      updatedAt
      latestMessage {
        ...messageFields
      }
      messages {
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
