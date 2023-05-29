import { graphql } from '@/generated/gql';

const MESSAGE_SENT = graphql(`
  subscription messageSent($conversationId: Float!) {
    messageSent(conversationId: $conversationId) {
      id
	  body
      createdAt
      conversation {
        id
      }
	  sender {
		id
		username
	  }
    }
  }
`);
