import { graphql } from "@/generated/gql";

const loginUser = graphql(`
mutation loginUser($username: String!, $password: String!) {
	login(loginInput: { username: $username, password: $password }) {
	  member {
		username
		phoneNumber
	  }
	  error {
		message
	  }
	}
  }
`)