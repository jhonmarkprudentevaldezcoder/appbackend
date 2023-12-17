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
  timein: {
    type: String,
  },
  
   timeout: {
    type: String,
  },

  timein: {
    type: String,
  },

  timeout: {
    type: String,
  },

  date: {
    type: String,
    required: [true, "Please enter date"],
  },
});

const Attendace = mongoose.model("attendace", attendaceSchema);

module.exports = Attendace;
