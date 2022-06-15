const Person = require("../models/Person");
const { Project } = require("../models/Project");
const { Team } = require("../models/Team");
const Review = require("../models/Review");
const Appendix = require("../models/Appendix");
const User = require('../models/User')
const jwt = require('jsonwebtoken');

require('dotenv').config();

const bcryptjs = require('bcryptjs')

const CrearToken = (user, secret, expiresIn) => {
  const { id, name, lastname, email, created } = user;
  return jwt.sign({ id, name, lastname, email, created }, secret, { expiresIn })
};

const resolvers = {
  Query: {
    // People query's
    getPerson: async (_, { id }) => {
      // check if the person already exists
      const person = await Person.findById(id);
      if (!person) throw new Error("It does not exist or does not have permissions on it.");
      return person;
    },
    getProject: async (_, { id }) => {
      // check if the person already exists
      const review = await Review.findById(id);
      if (!review) throw new Error("It does not exist or does not have permissions on it.");
      return review;
    },
    getTeam: async (_, { id }) => {
      // check if the person already exists
      const team = await Team.findById(id);
      if (!team) throw new Error("It does not exist or does not have permissions on it.");
      return team;
    },
    getReview: async (_, { id }) => {
      // check if the person already exists
      const review = await Review.findById(id);
      if (!review) throw new Error("It does not exist or does not have permissions on it.");
      return review;
    },
    getAppendix: async (_, { id }) => {
      // check if the person already exists
      const appendix = await Appendix.findById(id);
      if (!appendix) throw new Error("It does not exist or does not have permissions on it.");
      return appendix;
    },
    getAppendixs: async () => await Appendix.find({}),
    getPeople: async () => await Person.find({}),
    getProjects: async () => await Project.find({}),
    getTeams: async () => await Team.find({}),
    getReviews: async () => await Review.find({}),
  },
  Mutation: {

    getUser: async (_, { token }) => {
      const userid = jwt.verify(token, process.env.SECRETO);
      return userid;
    },

    AuthUser: async (_, { input }) => {
      const { email, password } = input;


      // cheack if the user already exist
      const userExist = await User.findOne({ email });
      if (!userExist) throw new Error('That user not found');

      // cheack password
      const correctPassword = await bcryptjs.compare(password, userExist.password);

      if (!correctPassword) throw new Error('That password has not correctly');

      // crear un token
      return {
        token: CrearToken(userExist, process.env.SECRETO, '24h'),
      }
    },

    createUser: async (_, { input }) => {
      // check if the user already exist
      const { email, password } = input;
      const userExist = await User.findOne({ email });
      if (userExist) throw new Error('That user already exists');
      //hashing password
      const salt = bcryptjs.genSaltSync(10);
      input.password = bcryptjs.hashSync(password, salt);

      // Save on database
      try {
        const user = new User(input);
        return await user.save();
      } catch (e) {
        console.log(e);
      }
    },
    // People Mutations
    createPerson: async (_, { input }, ctx) => {
      //check if the user exists already
      const {
        contact: { email },
      } = input;
      const emailResult = await Person.findOne(
        { "contact.email": email }, "contact");

      if (emailResult)
        throw new Error("A person already registered with this email address");

      try {
        input.admin = ctx.user.id;
        const personToSave = new Person(input);
        return await personToSave.save(); // save in my database
      } catch (e) {
        console.log("An error has been occurs", e);
      }
    },
    createProject: async (_, { input } = {}, ctx) => {
      // check if the project is already exits
      const { projectName } = input;
      const project = await Project.findOne({ projectName });
      if (project)
        throw new Error(`Project ${project.projectName} already exists`);
      try {
        input.admin = ctx.user.id;
        const project = new Project(input);
        console.log(project);
        return await project.save();
      } catch (e) {
        console.warn("An error occurred while saving project: ", e);
      }
    },
    updateProject: async (_, { id, input }, ctx) => {
      const project = await Project.findOne({ id, admin: ctx.user.id });
      if (!project) throw new Error("It does not exist or does not have permissions on it.");
      return await Project.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteProject: async (_, { id }, ctx) => {
      const project = await Project.findOne({ id, admin: ctx.user.id });
      if (!project) throw new Error("It does not exist or does not have permissions on it.d");
      await Project.findOneAndDelete({ _id: id });
      return "Project deleted successfully ";
    },

    createTeam: async (_, { input }, ctx) => {
      //check if the team already exists
      const { groupName } = input;
      const teamExists = await Team.findOne({ groupName });
      if (teamExists) throw new Error("that team already exists");
      try {
        input.admin = ctx.user.id;
        const team = new Team(input);
        return await team.save(); // save to database
      } catch (e) { }
    },
    updateTeam: async (_, { id, input }, ctx) => {
      const team = await Team.findOne({ id, admin: ctx.user.id });
      if (!team) throw new Error("It does not exist or does not have permissions on it.");
      // updateTeam
      return await Team.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteTeam: async (_, { id }, ctx) => {
      const team = await Team.findOne({ id, admin: ctx.user.id });
      if (!team) throw new Error("It does not exist or does not have permissions on it.");
      // delete team
      await Team.findOneAndDelete({ _id: id });
      return "Team deleted successfully";
    },

    createReview: async (_, { input }, ctx) => {
      try {
        input.admin = ctx.user.id;
        const review = new Review(input);
        return await review.save(); // save to database
      } catch (e) {
        console.warn("An error occurred while saving", e);
      }
    },
    updateReview: async (_, { id, input }, ctx) => {
      const review = await Review.findOne({ id, admin: ctx.user.id });
      if (!review) throw new Error("It does not exist or does not have permissions on it.");
      return await Review.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteReview: async (_, { id }, ctx) => {
      const review = await Review.findOne({ id, admin: ctx.user.id });
      if (!review) throw new Error("It does not exist or does not have permissions on it.");
      await Review.findOneAndDelete({ _id: id });
      return "Review deleted successfully";
    },
    createAppendix: async (_, { input }, ctx) => {
      try {
        console.log(input);
        input.admin = ctx.user.id;
        const appendix = new Appendix(input);
        return await appendix.save(); // save to database
      } catch (e) {
        console.warn("An error occurred while saving", e);
      }
    },
    updateAppendix: async (_, { input }, ctx) => {
      const appendix = await Appendix.findOne({ id, admin: ctx.user.id });
      if (!appendix) throw new Error("It does not exist or does not have permissions on it.");
      return await Appendix.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteAppendix: async (_, { id }, ctx) => {
      const appendix = await Appendix.findOne({ id, admin: ctx.user.id });
      if (!appendix) throw new Error("It does not exist or does not have permissions on it.");
      await Appendix.findOneAndDelete({ _id: id });
      return "appendix deleted successfully";
    },

    updateReview: async (_, { id, input }, ctx) => {
      const review = await Review.findOne({ id, admin: ctx.user.id });
      if (!review) throw new Error("It does not exist or does not have permissions on it.");
      return await Review.findOneAndUpdate({ _id: id }, input, { new: true });
    },
    deleteReview: async (_, { id }, ctx) => {
      const review = await Review.findOne({ id, admin: ctx.user.id });
      if (!review) throw new Error("It does not exist or does not have permissions on it.");
      await Review.findOneAndDelete({ _id: id });
      return "Review deleted successfully";
    },
    updatePerson: async (_, { id, input }, ctx) => {
      const person = await Person.findOne({ id, admin: ctx.user.id });
      if (!person) throw new Error("It does not exist or does not have permissions on it.");
      // updatePerson
      return await Person.findAndUpdate({ _id: id }, input, { new: true });
    },
    deletePerson: async (_, { id }, ctx) => {
      const person = await Person.findOne({ id, admin: ctx.user.id });
      if (!person) throw new Error("It does not exist or does not have permissions on it.");
      await Person.findByIdAndDelete({ _id: id });
      return "That person has been deleted";
    },
  },
};

module.exports = resolvers;
