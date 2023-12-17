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
    type: Date, // Use Date type for date fields
    default: Date.now, // Set default value to the current date and time
  },
});

const Attendace = mongoose.model("attendace", attendaceSchema);

module.exports = Attendace;
