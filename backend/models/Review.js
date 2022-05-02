const mongoose = require("mongoose");

const managersSchema = mongoose.Schema({
  firstPerson: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  secondPerson: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const reviewSchema = mongoose.Schema({
  report: {
    type: String,
    required: true,
    trim: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  managers: {
    type: managersSchema,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
