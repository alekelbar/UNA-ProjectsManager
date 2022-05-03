const mongoose = require("mongoose");

const Appendix = mongoose.Schema({
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
