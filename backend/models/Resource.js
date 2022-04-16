const mongoose = require("mongoose");

const TechnologySchema = mongoose.Schema({
  isRequired: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    trim: true,
  },
});

const PhysicistsSchema = mongoose.Schema({
  isRequired: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    trim: true,
  },
});

const resourceSchema = mongoose.Schema({
  description: {
    type: String,
    require: true,
    trim: true,
  },
  humanResources: {
    type: String,
    require: true,
    trim: true,
  },
  technology: {
    type: TechnologySchema,
  },
  physicists: {
    type: PhysicistsSchema,
  },
});

module.exports = resourceSchema;
