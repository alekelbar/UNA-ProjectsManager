const Person = require("../models/Person");
const { Project } = require("../models/Project");
const { Team } = require("../models/Team");
const Review = require("../models/Review");

const resolvers = {
  Query: {
    // People query's
    getPerson: async (_, { id }) => {
      // check if the person already exists
      const person = await Person.findById(id);
      if (!person) throw new Error("That person does not exist");
      return person;
    },
    getPeople: async () => await Person.find({}),
    getProjects: async () => await Project.find({}),
    getTeams: async () => await Team.find({}),
    getReviews: async () => await Review.find({}),
  },
  Mutation: {
    // People Mutations
    createPerson: async (_, { input }) => {
      //check if the user exists already
      const {
        contact: { email },
      } = input;
      const emailResult = await Person.findOne(
        { "contact.email": email },
        "contact"
      );
      if (emailResult)
        throw new Error("A person already registered with this email address");

      try {
        const personToSave = new Person(input);
        return await personToSave.save(); // save in my database
      } catch (e) {
        console.log("An error has been occurs", e);
      }
    },
    createProject: async (_, { input } = {}) => {
      // check if the project is already exits
      const { projectName } = input;
      const project = await Project.findOne({ projectName });
      if (project)
        throw new Error(`Project ${project.projectName} already exists`);
      try {
        const project = new Project(input);
        console.log(project);
        return await project.save();
      } catch (e) {
        console.warn("An error occurred while saving project: ", e);
      }
    },

    createTeam: async (_, { input }) => {
      //check if the team already exists
      const { groupName } = input;
      const teamExists = await Team.findOne({ groupName });
      if (teamExists) throw new Error("that team already exists");
      try {
        const team = new Team(input);
        return await team.save(); // save to database
      } catch (e) {}
    },

    createReview: async (_, { input }) => {
      try {
        const review = new Review(input);
        return await review.save(); // save to database
      } catch (e) {
        console.warn("An error occurred while saving", e);
      }
    },
  },
};

module.exports = resolvers;
