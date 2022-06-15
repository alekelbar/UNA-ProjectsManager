const { gql } = require("apollo-server");

const typeDefs = gql`
  "available roles"
  enum Role {
    STUDENT
    ACADEMIC
    ADMINISTRATIVE
  }

  #token --------------------------------------------------------------------
  #token definition

  type Token {
    token: String
  }

  #user --------------------------------------------------------------------
  #user definition
  type User {
    id: ID
    name: String,
    lastname: String,
    email: String,
    created: String
  }

  input UserInput {
    name: String!,
    lastname: String!,
    email: String!,
    password: String!
  }

  input AuthUser_input {
    email: String!,
    password: String!
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

    admin: ID
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

    admin: ID
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
   "This identifies the type of team"
  type Team {
  "This is the name of the team"
    groupName: String
    "These are the participants of the team"
    participants: [Participant]
    "These are the objetives of the team"
    objectives: [objectiveSchema]
    "This is the activity of the team"
    activity: [Activity]
    "This is the resources of the team"
    resources: ResourcesSchema
  }
  "This identifies the type of the Resources schema"
  type ResourcesSchema {
  "This is the description of  the resources schema"
    description: String
    "This is the human resources of theresources schema"
    humanResources: String
    "This is the technology of the resources schema"
    technology: Technology
    "This is the physicists of the resources schema"
    physicists: Physicists
  }
  "This identifies the type of the technology"
  type Technology {
  "Returns true or false if the technology is required"
    isRequired: Boolean
    "This is the description of the technology"
    description: String
  }
 "This identifies the type of the Physicists"
  type Physicists {
  "Returns true or false if the Physicists is required"
    isRequired: Boolean
     "This is the description of the Physicists"
    description: String
  }
 "This identifies the type of the Activity"
  type Activity {
   "This is the description of the Activity"
    description: String
    "This is tags of the Activity"
    tags: [String]
  }
 "INPUT: This identifies the type of team"
  input teamInput {
    "INPUT: This is the name of the team"
    groupName: String!
    "INPUT: These are the participants of the team"
    participants: [inputParticipant]!
    objectives: [inputObjectiveSchema]!
     "INPUT:This is the activity of the team"
    activity: inputActivity!
    active: Boolean
    "INPUT: This is the resources of the team"
    resources: inputResourcesSchema
  }
 "INPUT: This identifies the type of the Resources schema"
  input inputResourcesSchema {
    "INPUT : This is the description of the resources schema"
    description: String!
      "INPUT: This is the human resources of  the resources schema"
    humanResources: String!
     "INPUT: This is the technology of the resources schema"
    technology: inputTechnology
     "INPUT:This is the physicists of the resources schema"
    physicists: inputPhysicists
  }
"INPUT:This identifies the type of the technology"
  input inputTechnology {
  "INPUT:Returns true or false if the technology is required"
    isRequired: Boolean
     "INPUT: This is the description of the technology"
    description: String
  }
 "INPUT:This identifies the type of the Physicists"
  input inputPhysicists {
  "INPUT:Returns true or false if the Physicists is required"
    isRequired: Boolean
    "INPUT:This is the description of the Physicists"
    description: String
  }
 "INPUT:This identifies the type of the Activity"
  input inputActivity {
   "INPUT:This is the description of the Activity"
    description: String!
      "INPUT:This is tags of the Activity"
    tags: [String]
  }

  #Projects --------------------------------------------------------------------
  #project definition
  "This identifies the type of the project"
  type Project {
  "This is the name of the project"
    projectName: String
    "These are the disciplinary areas of the project"
    disciplinaryAreas: DisciplinaryAreas
    "These are the objetives of project"
    objectives: [objectiveSchema]
    "Identifier the responsible of the project"
    responsible: ID
    "These are participants of the project"
    participants: [Participant]
    "This is the effect of the project" 
    effect: projectEffect
    "This is the resources of the project"
    resources: ResourcesSchema
    "This is the budget of the project"
    budget: budgetSchema

    admin: ID
  }
 "This identifies the type of budget schema"
  type budgetSchema {
  "This is the description of the budget schema"
    description: String
    "This is the amount of the budget schema"
    Amount: Float
  }
"This identifies the type of the  project Effect"
  type projectEffect {
  "This is when the effect of the project starts"
    start: String
    "This is when the effect of the project ends"
    end: String
  }
"This identifies the type of the  participants"
  type Participant {
   "Identifier of the participant"
    participant: ID
  }
"This identifies the type of the  objective Schema"
  type objectiveSchema {
  "This is the purpose of the objetive schema"
    purpose: String
    "This is the description of the objetive schema"
    description: String
  }
"This identifies the type of the  disciplinary areas"
  type DisciplinaryAreas {
  "These are the areas of the disciplinary areas"
    areas: [String]
   " Returns true or false if the Multidisciplinary is required"
    isMultidisciplinary: Boolean
    " Returns true or false if the Interdisciplinary is required"
    isInterdisciplinary: Boolean
  }
 "INPUT:This identifies the type of the project"
  input projectInput {
   "INPUT:This is the name of the project"
    projectName: String! 
    "INPUT:These are the disciplinary areas of the project"
    disciplinaryAreas: inputDisciplinaryAreas!
      "INPUT:These are the objetives of project"
    objectives: [inputObjectiveSchema]!
     "INPUT:Identifier the responsible of the project"
    responsible: ID!
     "INPUT:These are participants of the project"
    participants: [inputParticipant!]
      "INPUT:This is the effect of the project" 
    effect: inputProjectEffect!
     "INPUT:This is the resources of the project"
    resources: inputResourcesSchema!
      "INPUT:This is the budget of the project"
    budget: inputBudgetSchema!
  }
 "INPUT:This identifies the type of budget schema"
  input inputBudgetSchema {
    "INPUT:This is the description of the budget schema"
    description: String!
     "INPUT:This is the amount of the budget schema"
    Amount: Float!
  }
"INPUT:This identifies the type of project Effect"
  input inputProjectEffect {
    "INPUT:This is when the effect of the project starts"
    start: String
      "INPUT:This is when the effect of the project ends"
    end: String
  }
"INPUT:This identifies the type of the  participants"
  input inputParticipant {
    "INPUT:Identifier of the participant"
    participant: ID
  }
"INPUT:This identifies the type of the  objective Schema"
  input inputObjectiveSchema {
   "INPUT:This is the purpose of the objetive schema"
    purpose: String!
   "INPUT:This is the description of the objetive schema"
    description: String!
  }
"INPUT:This identifies the type of the  disciplinary areas"
  input inputDisciplinaryAreas {
   "INPUT:These are the areas of the disciplinary areas"
    areas: [String!]!
     "INPUT: Returns true or false if the Multidisciplinary is required"
    isMultidisciplinary: Boolean!
     "INPUT: Returns true or false if the Interdisciplinary is required"
    isInterdisciplinary: Boolean!
  }

  #People ----------------------------------------------------------------------
  #person definition
  "This makes it possible to add a person."
  type Person {
    id: ID
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

    admin: ID
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

    getUser: User

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
    #User
    createUser(input: UserInput): User
    AuthUser(input: AuthUser_input): Token
    
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
