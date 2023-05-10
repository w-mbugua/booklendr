import { graphql } from '@/generated/gql';

const GET_LENDER_RESERVATIONS = graphql(`
  query GET_LENDER_RESERVATIONS($lenderId: Float!) {
    reservationsByLenderId(lenderId: $lenderId) {
      ...reservationFields
    }
  }
`);
