import { graphql } from '@/generated/gql';

const NOTIFICATIONS = graphql(`
  subscription notifications($userId: Float!) {
    newNotification(userId: $userId) {
      ...userFields
    }
  }
`);
