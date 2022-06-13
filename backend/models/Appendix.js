const mongoose = require("mongoose");

const Appendix = mongoose.Schema({

  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
    require: true
  },

  description: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
  dataUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Appendix", Appendix);
