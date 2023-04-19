import { graphql } from '@/generated/gql';

const getAllBooks = graphql(`
  query GetBooks {
    getBooks {
      id
      title
      subtitle
      description
      textSnippet
      createdAt
      cover
      thumbnail
      status
      author {
        name
      }
      owner {
        id
        username
        phoneNumber
        email
      }
      reservations {
        createdAt
        status
        reserver {
          username
          email
        }
      }
      loans {
        returnDate
        borrower {
          username
        }
      }
      tags {
        name
      }
    }
  }
`);
