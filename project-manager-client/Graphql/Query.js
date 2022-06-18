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
  getPerson: gql`
  query GetPerson($getPersonId: ID!) {
    getPerson(id: $getPersonId) {
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
  getOwners: gql`
    query Query {
      getPeople {
        id
        name
      }
    }
  `,
  getAppendixs: gql`
    query GetAppendixs {
    getAppendixs {
      description
      owner
      dataUrl
      admin
  }
}
  `,
  getPeopleOnlyId: gql`
    
  query GetPeople {
    getPeople {
      id
      name
      contact {
      email
      }
    }
  }
  `,
}




export default Query;