const mongoose = require("mongoose");

const studentsSchema = mongoose.Schema({
  username: {
    type: String,
  },
  lrn: {
    type: String,
  },

  firstName: {
    type: String,
  },

  middleName: {
    type: String,
  },

  lastName: {
    type: String,
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
