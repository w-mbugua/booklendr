import { graphql } from '@/generated/gql';

const READ_NOTIFICATIONS = graphql(`
  mutation readNotifications {
    markNotificationsAsRead {
      ...userFields
    }
  }
`);
