import { graphql } from "@/generated/gql";

const loginUser = graphql(`
mutation loginUser($email: String, $phoneNumber: String, $password: String!) {
	login(loginInput: { email: $email, phoneNumber: $phoneNumber, password: $password }) {
	  member {
		id
		username
		phoneNumber
		email
	  }
	  error {
		message
	  }
	}
  }
`)