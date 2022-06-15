import { gql } from "@apollo/client";

const Mutation = {
  createUser: gql`
    mutation CreateUser($input: UserInput) {
      createUser(input: $input) {
        id
        name
        lastname
        email
        created
    }
  }`,
  authUser: gql`
    mutation AuthUser($input: AuthUser_input) {
     AuthUser(input: $input) {
      token
  }
}
  `,
}

export default Mutation;