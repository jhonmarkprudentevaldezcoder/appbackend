const mongoose = require("mongoose");

const attendaceSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username"],
  },
  status: {
    type: String,
    required: [true, "Please enter status"],
  },

  lrn: {
    type: String,
    required: [true, "Please enter lrn"],
  },

  date: {
    type: String,
    required: [true, "Please enter date"],
  },
});

const Attendace = mongoose.model("attendace", attendaceSchema);

module.exports = Attendace;
