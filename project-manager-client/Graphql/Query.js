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
      id
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
  getReviews: gql`
    query GetReviews {
    getReviews {
      id
      report
      project
      managers {
        firstPerson
        secondPerson
      }
      grade
      admin
    }
}
  `,
  getManagers: gql`
    query GetManagers($idF: ID!, $idS: ID!) {
    getManagers(id_f: $idF, id_s: $idS) {
      name
      lastName
  }
}
  `,
  getProject: gql`
    query GetProject($getProjectId: ID!) {
     getProject(id: $getProjectId) {
     projectName
  }
}
  `,
  getProjects: gql`
    query GetProjects {
   getProjects {
    projectName
    id
  }
}
  `,
  getReview: gql`
    query GetReview($getReviewId: ID!) {
  getReview(id: $getReviewId) {
    id
    report
    project
    managers {
      secondPerson
      firstPerson
    }
    grade
    admin
  }
}
  `,
}




export default Query;