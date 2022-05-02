const { gql } = require("apollo-server");

const typeDefs = gql`
  #Reviews --------------------------------------------------------------------
  #Review definition
  type Review {
    report: String
    project: ID
    managers: managersSchema
    grade: Int
  }

  type managersSchema {
    firstPerson: ID
    secondPerson: ID
  }

  input inputManagersSchema {
    firstPerson: ID!
    secondPerson: ID!
  }

  input inputReview {
    report: String!
    project: ID!
    managers: inputManagersSchema!
    grade: Int!
  }

  #Teams --------------------------------------------------------------------
  #Team definition
  type Team {
    groupName: String
    participants: [Participant]
    objectives: [objectiveSchema]
    activity: [Activity]
    resources: ResourcesSchema
  }

  type ResourcesSchema {
    description: String
    humanResources: String
    technology: Technology
    physicists: Physicists
  }

  type Technology {
    isRequired: Boolean
    description: String
  }

  type Physicists {
    isRequired: Boolean
    description: String
  }

  type Activity {
    description: String
    tags: [String]
  }

  input teamInput {
    groupName: String!
    participants: [inputParticipant]!
    objectives: [inputObjectiveSchema]!
    activity: inputActivity!
    active: Boolean
    resources: inputResourcesSchema
  }

  input inputResourcesSchema {
    description: String!
    humanResources: String!
    technology: inputTechnology
    physicists: inputPhysicists
  }

  input inputTechnology {
    isRequired: Boolean
    description: String
  }

  input inputPhysicists {
    isRequired: Boolean
    description: String
  }

  input inputActivity {
    description: String!
    tags: [String]
  }

  #Projects --------------------------------------------------------------------
  #project definition
  type Project {
    projectName: String
    disciplinaryAreas: DisciplinaryAreas
    objectives: [objectiveSchema]
    responsible: ID
    participants: [Participant]
    effect: projectEffect
    resources: ResourcesSchema
    budget: budgetSchema
  }

  type budgetSchema {
    description: String
    Amount: Float
  }

  type projectEffect {
    start: String
    end: String
  }

  type Participant {
    participant: ID
  }

  type objectiveSchema {
    purpose: String
    description: String
  }

  type DisciplinaryAreas {
    areas: [String]
    isMultidisciplinary: Boolean
    isInterdisciplinary: Boolean
  }

  input projectInput {
    projectName: String!
    disciplinaryAreas: inputDisciplinaryAreas!
    objectives: [inputObjectiveSchema]!
    responsible: ID!
    participants: [inputParticipant!]
    effect: inputProjectEffect!
    resources: inputResourcesSchema!
    budget: inputBudgetSchema!
  }

  input inputBudgetSchema {
    description: String!
    Amount: Float!
  }

  input inputProjectEffect {
    start: String
    end: String
  }

  input inputParticipant {
    participant: ID
  }

  input inputObjectiveSchema {
    purpose: String!
    description: String!
  }

  input inputDisciplinaryAreas {
    areas: [String!]!
    isMultidisciplinary: Boolean!
    isInterdisciplinary: Boolean!
  }

  #People ----------------------------------------------------------------------
  #person definition

  type Person {
    role: [Role] #One person can get multiple roles on my app
    name: String
    lastName: String
    dateOfBirth: String
    # Age: Number; I can get it from the date of birth
    nationality: String
    address: Address
    professional: ProfessionalInformation
    contact: ContactInformation
  }

  # available roles
  enum Role {
    STUDENT
    ACADEMIC
    ADMINISTRATIVE
  }

  type ProfessionalInformation {
    occupation: [String] #if you have multiple professions
    EntryDate: String
    # yearsOfExp: String; I can calculate from the entry date
  }

  type ContactInformation {
    phones: [String]
    email: String
  }

  #Address type
  type Address {
    city: String
    village: String
    description: String
  }

  #people mutations
  input personInput {
    role: [Role]! #One person can get multiple roles on my app
    name: String!
    lastName: String!
    dateOfBirth: String!
    # Age: Number; I can get it from the date of birth
    nationality: String!
    address: addressInput!
    professional: inputProfessionalInformation #It's optional because if it's a student, don't need to have this information
    contact: inputContactInformation!
  }

  input inputProfessionalInformation {
    occupation: [String]!
    EntryDate: String!
    # yearsOfExp: String; I can calculate from the entry date
  }

  input inputContactInformation {
    phones: [String]!
    email: String!
  }

  input addressInput {
    city: String!
    village: String!
    description: String
  }

  type Query {
    #People ----------------------------------------------------------------------
    getPerson(id: ID!): Person
    getPeople: [Person]
    #projects
    getProjects: [Project]
    #Teams
    getTeams: [Team]
    #Reviews
    getReviews: [Review]
  }

  type Mutation {
    #People
    createPerson(input: personInput): Person
    #projects
    createProject(input: projectInput): Project
    #Teams
    createTeam(input: teamInput): Team
    #Reviews
    createReview(input: inputReview): Review
  }
`;

module.exports = typeDefs;
