import { graphql } from '@/generated/gql';

const SEND_MESSAGE = graphql(`
  mutation sendMessage($messageData: MessageInput!) {
    sendMessage(messageData: $messageData) {
      body
      id
    }
  }
`);
