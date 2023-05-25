import { graphql } from '@/generated/gql';

const CREATE_CONVERSATION = graphql(`
mutation createConversation($createConversationData: conversationsInput!){
	createConversation(createConversationData: $createConversationData) {
		conversation {
			id
		}
	}
}`);
