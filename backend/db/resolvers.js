const Person = require("../models/Person");
const { Project } = require("../models/Project");
const { Team } = require("../models/Team");
const Review = require("../models/Review");
const Appendix = require("../models/Appendix");

const resolvers = {
  Query: {
    // People query's
    getPerson: async (_, { id }) => {
      // check if the person already exists
      const person = await Person.findById(id);
      if (!person) throw new Error("That person does not exist");
      return person;
    },
    getProject: async (_, { id }) => {
      // check if the person already exists
      const review = await Review.findById(id);
      if (!review) throw new Error("That review does not exist");
      return review;
    },
    getTeam: async (_, { id }) => {
      // check if the person already exists
      const team = await Team.findById(id);
      if (!team) throw new Error("That team does not exist");
      return team;
    },
    getReview: async (_, { id }) => {
      // check if the person already exists
      const review = await Review.findById(id);
      if (!review) throw new Error("That review does not exist");
      return review;
    },
    getAppendix: async (_, { id }) => {
      // check if the person already exists
      const appendix = await Appendix.findById(id);
      if (!appendix) throw new Error("That appendix does not exist");
      return appendix;
    },
    getAppendixs: async () => await Appendix.find({}),
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
    updateProject: async (_, { id, input }) => {
      const project = await Project.findById(id);
      if (!project) throw new Error("Project not found");
      return await Project.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteProject: async (_, { id }) => {
      const project = await Project.findOneById(id);
      if (!project) throw new Error("project not found");
      await Project.findOneAndDelete({ _id: id });
      return "Project deleted successfully ";
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
    updateTeam: async (_, { id, input }) => {
      const team = await Team.findById({ _id: id });
      if (!team) throw new Error("that team does not exist");
      // updateTeam
      return await Team.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteTeam: async (_, { id, input }) => {
      const team = await Team.findById(id);
      if (!team) throw new Error("that team does not exist");
      // delete team
      await Team.findOneAndDelete({ _id: id });
      return "Team deleted successfully";
    },

    createReview: async (_, { input }) => {
      try {
        const review = new Review(input);
        return await review.save(); // save to database
      } catch (e) {
        console.warn("An error occurred while saving", e);
      }
    },
    updateReview: async (_, { id, input }) => {
      const review = await Review.findById(id);
      if (!review) throw new Error("that review does not exist");
      return await Review.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteReview: async (_, { id }) => {
      const review = await Review.findById(id);
      if (!review) throw new Error("that review does not exist");
      await Review.findOneAndDelete({ _id: id });
      return "Review deleted successfully";
    },
    createAppendix: async (_, { input }) => {
      try {
        console.log(input);
        const appendix = new Appendix(input);
        return await appendix.save(); // save to database
      } catch (e) {
        console.warn("An error occurred while saving", e);
      }
    },
    updateReview: async (_, { id, input }) => {
      const review = await Review.findById(id);
      if (!review) throw new Error("that review does not exist");
      return await Review.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteReview: async (_, { id }) => {
      const review = await Review.findById(id);
      if (!review) throw new Error("that review does not exist");
      await Review.findOneAndDelete({ _id: id });
      return "Review deleted successfully";
    },
    updatePerson: async (_, { id, input }) => {
      const person = await Person.findById(id);
      if (!person) throw new Error("that person does not exist");
      // updatePerson
      return await Person.findAndUpdate({ _id: id }, input, { new: true });
    },
    deletePerson: async (_, { id }) => {
      const person = await Person.findById(id);
      if (!person) throw new Error("that person does not exist");
      await Person.findByIdAndDelete({ _id: id });
      return "That person has been deleted";
    },
  },
};

module.exports = resolvers;
