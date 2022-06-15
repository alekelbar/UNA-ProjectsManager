import { gql } from "@apollo/client";

const Query = {
  GetPeople: gql`
  query GetPeople {
    getPeople {
      id
      role
      name
      lastName
      dateOfBirth
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
      nationality
    }
  }
  `,
  getUser: gql`
      query Query {
        getUser {
          id
          name
          lastname
          email
          created
        }
      }
  `,

}


export default Query;