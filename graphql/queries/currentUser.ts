import { graphql } from '@/generated/gql';

const currentUser = graphql(`
query CurrentUser {
  currentUser {
    id
    email
    phoneNumber
    username
    books {
      ...bookFields
      
      }
    }
  }
`)