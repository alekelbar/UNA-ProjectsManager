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
  createPerson: gql`
    mutation CreatePerson($input: personInput) {
    createPerson(input: $input) {
      role
      name
      lastName
      dateOfBirth
      nationality
      address {
        city
        village
        description
      }
      professional {
        occupation
        EntryDate
      }
      contact {
        phones
        email
      }
      admin
    }
}
  `,
  deletePerson: gql`
    mutation deletePerson($deletePersonId: ID!) {
      deletePerson(id: $deletePersonId)
    }
  `,
  updatePerson: gql`
   mutation UpdatePerson($updatePersonId: ID!, $input: personInput) {
     updatePerson(id: $updatePersonId, input: $input) {
       id
       role
       name
       lastName
       dateOfBirth
       nationality
       address {
         city
         village
         description
       }
       professional {
         occupation
         EntryDate
       }
       contact {
         phones
         email
       }
       admin
     }
   }
 `,
  createAppendix: gql`
  mutation CreateAppendix($input: AppendixInput) {
  createAppendix(input: $input) {
    description
    owner
    dataUrl
    admin
  }
}
 `,
}

export default Mutation;