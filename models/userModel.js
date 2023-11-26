const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username"],
  },
  lrn: {
    type: String,
    required: [true, "Please enter lrn"],
  },

  firstName: {
    type: String,
    required: [true, "Please enter firstName"],
  },

  middleName: {
    type: String,
    required: [true, "Please enter middleName"],
  },

  lastName: {
    type: String,
    required: [true, "Please enter lastName"],
  },
  rfid: {
    type: String,
  },
  timein: {
    type: String,
  },
  timeou: {
    type: String,
  },
});

const Students = mongoose.model("students", studentsSchema);

module.exports = Students;
