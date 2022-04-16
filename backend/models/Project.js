const mongoose = require("mongoose");
const Resource = require("./Resource");

const DisciplinaryAreas = mongoose.Schema({
  areas: {
    type: Array,
    of: String,
    required: true,
  },
  isMultidisciplinary: {
    type: Boolean,
    default: false,
  },
  isInterdisciplinary: {
    type: Boolean,
    default: false,
  },
});

const objectiveSchema = mongoose.Schema({
  purpose: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
});

const participantSchema = mongoose.Schema({
  participant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Person",
  },
});

const durationSchema = mongoose.Schema({
  start: {
    type: Date,
    default: Date.now(),
  },
  end: {
    type: Date,
    required: true,
  },
});

const budgetSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
});

const projectSchema = mongoose.Schema({
  projectName: {
    type: String,
    unique: true,
    required: true,
  },

  disciplinaryAreas: {
    type: DisciplinaryAreas,
    required: true,
  },

  objectives: {
    type: Array,
    of: objectiveSchema,
    required: true,
  },

  responsible: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Person",
  },

  participants: {
    type: Array,
    of: participantSchema,
    required: true,
  },

  effect: {
    type: durationSchema,
    required: true,
  },

  resources: {
    type: Resource,
  },

  budget: {
    type: budgetSchema,
  },
});

exports.Project = mongoose.model("Project", projectSchema);
exports.participant = participantSchema;
exports.objective = objectiveSchema;
