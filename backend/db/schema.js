const { gql } = require("apollo-server");

const typeDefs = gql `
  "available roles"
  enum Role {
    STUDENT
    ACADEMIC
    ADMINISTRATIVE
  }

  #Appendix --------------------------------------------------------------------
  #Appendix definition

  "This makes it possible to represent an attachment"
  type Appendix {
    "This is the description of an attachment"
    description: String
    "This is the owner of the appendix"
    owner: ID
    "This is the URL of the attachment"
    dataUrl: String
  }
  "INPUT: This makes it possible to represent an attachment "
  input AppendixInput {
    "INPUT: This is the description of an attachment"
    description: String!
    "INPUT: This is the owner of the appendix"
    owner: ID!
    "INPUT: This is the URL of the attachment"
    dataUrl: String!
  }

  #Reviews --------------------------------------------------------------------
  #Review definition
  "This identifies the type of review"
  type Review {
    "This would be a description of the review"
    report: String
    "Identifier of the project to be evaluated"
    project: ID
    "Identify of the person in charge of the review"
    managers: managersSchema
    "This would be the qualification"
    grade: Int
  }

  "Type of qualifier"
  type managersSchema {
    "First qualifier identifier "
    firstPerson: ID
    "Second qualifier identifier "
    secondPerson: ID
  }
  "INPUT: Type of qualifier"
  input inputManagersSchema {
    "INPUT: First qualifier identifier"
    firstPerson: ID!
    "INPUT: Second qualifier identifier"
    secondPerson: ID!
  }
  "INPUT: This identifies the type of review"
  input inputReview {
    "INPUT:This would be a description of the review"
    report: String!
    "INPUT:Identifier of the project to be evaluated"
    project: ID!
    "INPUT: Identify of the person in charge of the review"
    managers: inputManagersSchema!
    "INPUT: This would be the qualification"
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
  "This makes it possible to add a person."
  type Person {
    "The person's role."
    role: [Role] #One person can get multiple roles on my app
    "The person's name."
    name: String
    "The person's last name."
    lastName: String
    "The person's date of birth."
    dateOfBirth: String
    # Age: Number; I can get it from the date of birth
    "The person's nationality."
    nationality: String
    "The person's address."
    address: Address
    "This refers to the person's professional information."
    professional: ProfessionalInformation
    "This refers to the person's contact information."
    contact: ContactInformation
  }
  
  "This makes it possible to add professional information to the person."
  type ProfessionalInformation {
    "The person's occupation."
    occupation: [String] #if you have multiple professions
    "The person's date of entry."
    EntryDate: String
    # yearsOfExp: String; I can calculate from the entry date
  }
  
  "This makes it possible to add contact information to the person."
  type ContactInformation {
    "The person's phone numbers."
    phones: [String]
    "The person's e-mail address."
    email: String
  }
  
  #Address type
  "This makes it possible to add an address to the person."
  type Address {
    "The person's city."
    city: String
    "The person's village."
    village: String
    "Description of the person's address."
    description: String
  }

  #people 
  "INPUT: this makes it possible to add a person."
  input personInput {
    "INPUT: the person's role."
    role: [Role]! #One person can get multiple roles on my app
    "INPUT: the person's name."
    name: String!
    "INPUT: the person's last name."
    lastName: String!
    "INPUT: the person's date of birth."
    dateOfBirth: String!
    # Age: Number; I can get it from the date of birth
    "INPUT: the person's nationality."
    nationality: String!
    "INPUT: the person's address."
    address: addressInput!
    "INPUT: this refers to the person's professional information."
    professional: inputProfessionalInformation #It's optional because if it's a student, don't need to have this information
    "INPUT: this refers to the person's contact information."
    contact: inputContactInformation!
  }
  
  "INPUT: this makes it possible to add professional information to the person."
  input inputProfessionalInformation {
    "INPUT: the person's occupation."
    occupation: [String]!
    "INPUT: the person's date of entry."
    EntryDate: String!
    # yearsOfExp: String; I can calculate from the entry date
  }
  
  "INPUT: this makes it possible to add professional contact to the person."
  input inputContactInformation {
    "INPUT: the person's phone numbers."
    phones: [String]!
    "INPUT: the person's e-mail address."
    email: String!
  }
  
  "INPUT: this makes it possible to add an address to the person."
  input addressInput {
    "INPUT: the person's city."
    city: String!
    "INPUT: the person's village."
    village: String!
    "INPUT: description of the person's address."
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
