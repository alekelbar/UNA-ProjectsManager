import { gql } from "@apollo/client";

const Query = {
  getPeople: gql`
  query GetPeople {
    getPeople {
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
    getPeople {
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