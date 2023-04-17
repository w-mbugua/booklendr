import { graphql } from "@/generated/gql";

const currentUser = graphql(`
query CurrentUser {
  currentUser {
    id
    email
    phoneNumber
    username
    books {
      title
      tags {
        name
      }
      status
      author {
        name
      }
      loans {
        borrower {
          username
          phoneNumber
          email
        }
        createdAt
        returnDate
        book {
          title
          id
        }
      }
      reservations {
        reserver {
          username
          phoneNumber
          email
        }
        status
        createdAt
        updatedAt
        book {
          title
          id
        }
      }
    }
  }
}
`)