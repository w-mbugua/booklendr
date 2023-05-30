import { graphql } from '@/generated/gql';

const CONVERSATIONS = graphql(`
  query conversations {
    conversations {
      id
      createdAt
      updatedAt
      latestMessage {
        body
        createdAt
        sender {
          username
          id
        }
      }
      messages {
        id
        body
        createdAt
        sender {
          id
          username
        }
      }
      participants {
        userId
        hasSeenLatestMessage
        id
      }
    }
  }
`);
