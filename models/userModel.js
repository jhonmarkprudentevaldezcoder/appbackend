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

  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  bday: {
    type: String,
  },
  bplace: {
    type: String,
  },

  mname: {
    type: String,
  },
  mcontact: {
    type: String,
  },
  fname: {
    type: String,
  },
  fcontact: {
    type: String,
  },
});

const Students = mongoose.model("students", studentsSchema);

module.exports = Students;
