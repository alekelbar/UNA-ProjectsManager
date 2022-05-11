const { gql } = require("apollo-server");

const typeDefs = gql`
  #Appendix --------------------------------------------------------------------
  #Appendix definition
  
  type Appendix {
    description: String
    owner: ID
    dataUrl: String
  }

  input AppendixInput {
    description: String!
    owner: ID!
    dataUrl: String!
  }

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

    "Allows to obtain a list of registered persons"
    getPeople: [Person]
    "Allows to obtain a person from its unique identifier."
    getPerson(id: ID!): Person

    #projects

    "Allows to obtain a list of registered projects"
    getProjects: [Project]
    "Allows to obtain a project from its unique identifier."
    getProject(id: ID!): Project

    #Teams

    "Allows to obtain a list of registered equipment"
    getTeams: [Team]
    "Allows to obtain a device from its unique identifier."
    getTeam(id: ID!): Team

    #Reviews

    "Allows to obtain a list of registered revisions"
    getReviews: [Review]
    "Allows you to obtain a revision from your unique identifier."
    getReview(id: ID!): Review

    #Appendix

    "Allows to obtain a list of registered attachments"
    getAppendixs: [Appendix]
    "Allows you to obtain an attachment from your unique identifier."
    getAppendix(id: ID!): Appendix
  }

  type Mutation {
    #People

    "Allows registration of persons"
    createPerson(input: personInput): Person
    "Allows you to update people"
    updatePerson(id: ID!, input: personInput): Person
    "Allows you to remove people"
    deletePerson(id: ID!): String

    #projects

    "Allows you to create projects"
    createProject(input: projectInput): Project
    "Allows you to update projects"
    updateProject(id: ID!, input: projectInput): Project
    "Allows deletion of projects"
    deleteProject(id: ID!): String

    #Teams

    "Allows you to create teams"
    createTeam(input: teamInput): Team
    "Enables equipment upgrades"
    updateTeam(id: ID!, input: teamInput): Team
    "Allows you to remove equipment"
    deleteTeam(id: ID!): String

    #Reviews

    "Allows you to create revisions"
    createReview(input: inputReview): Review
    "Allows you to update revisions"
    updateReview(id: ID!, input: inputReview): Review
    "Allows deletion of revisions"
    deleteReview(id: ID!): String

    #Appendix

    "Allows you to create revisions"
    createAppendix(input: AppendixInput): Appendix
    "Allows you to update revisions"
    updateAppendix(id: ID!, input: AppendixInput): Appendix
    "Allows deletion of revisions"
    deleteAppendix(id: ID!): String
  }
`;

module.exports = typeDefs;
