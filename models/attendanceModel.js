const mongoose = require("mongoose");

const attendaceSchema = mongoose.Schema({
  username: {
    type: String,
  },
  status: {
    type: String,
  },

  lrn: {
    type: String,
  },
  rfid: {
    type: String,
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
  },
});

const Attendace = mongoose.model("attendace", attendaceSchema);

module.exports = Attendace;
