const mongoose = require("mongoose");
const { participant, objective } = require("./Project");
const Resource = require("./Resource");

const activitySchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  tags: [String], // optional tags to easy search through the application
});

const teamSchema = mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    unique: true,
  },
  participants: {
    type: Array,
    of: participant,
    required: true,
  },
  objectives: {
    type: Array,
    of: objective,
    required: true,
  },
  activity: {
    type: activitySchema,
    required: true,
  },
  resources: {
    type: Resource,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

exports.Team = mongoose.model("Team", teamSchema);
