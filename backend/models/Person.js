const mongoose = require("mongoose");

//subSchema
const AddressSchema = mongoose.Schema({
  city: {
    type: String,
    trim: true,
    require: true,
  },

  village: {
    type: String,
    trim: true,
    require: true,
  },

  description: {
    type: String,
    trim: true,
    require: true,
  },
});

const ProfessionalInformation = mongoose.Schema({
  occupation: {
    type: [String],
    require: true,
  },
  EntryDate: {
    type: String,
    require: true,
  },
});

const ContactInformation = mongoose.Schema({
  phones: {
    type: Array,
    of: String,
    require: true,
  },
  email: { type: String, require: true, unique: true },
});

const PersonSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },

  lastName: {
    type: String,
    trim: true,
    require: true,
  },

  dateOfBirth: {
    type: Date,
    require: true,
  },

  nationality: {
    type: String,
    trim: true,
    require: true,
  },

  address: {
    type: AddressSchema,
    require: true,
  },

  role: [String],
  professional: {
    type: ProfessionalInformation,
  },

  contact: { type: ContactInformation, require: true },
});

module.exports = mongoose.model("Person", PersonSchema);
