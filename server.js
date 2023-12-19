const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Students = require("./models/userModel");
const Attendace = require("./models/attendanceModel");
const Admin = require("./models/adminMode");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//fetch all attendace
app.get("/student/attendance/:rfid", async (req, res) => {
  try {
    const { rfid } = req.params;
    const student = await Attendace.find({ rfid: rfid });

    if (student.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add attendace
app.post("/student/attendance", async (req, res) => {
  try {
    const userAttendance = await Attendace.create(req.body);
    res.status(200).json(userAttendance);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Search student by RFID and get mcontact
app.get("/student/:rfid", async (req, res) => {
  try {
    const { rfid } = req.params;
    const student = await Attendace.findOne({ rfid: rfid });

    if (!student) {
      return res.status(404).json({ message: "No matching records found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//fetch all attendace
app.get("/attendance", async (req, res) => {
  try {
    const attendace = await Attendace.find({});
    res.status(200).json(attendace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//search student
app.get("/student/:lrn", async (req, res) => {
  try {
    const { lrn } = req.params;
    const student = await Students.find({ lrn: lrn });

    if (student.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Search student by RFID and get mcontact
app.get("/student/:rfid/mcontact", async (req, res) => {
  try {
    const { rfid } = req.params;
    const student = await Students.findOne({ rfid: rfid });

    if (!student) {
      return res.status(404).json({ message: "No matching records found" });
    }

    // Assuming mcontact is a field in the Students model
    const mcontact = student.mcontact;

    res.status(200).json({ mcontact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update student
app.put("/student/:lrn", async (req, res) => {
  try {
    const { lrn } = req.params;
    const updatedStudent = await Students.findOneAndUpdate({ lrn }, req.body, {
      new: true,
    });

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ message: `Cannot find any student with LRN ${lrn}` });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update student timein/timeout
/* app.put("/student/time/:rfid", async (req, res) => {
  try {
    const { rfid } = req.params;

    // Update the "timein" or "timeout" property based on AM or PM
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      // AM: Update timein
      req.body.timein = currentTime.toLocaleString("Asia/Manila", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Display 24-hour format
      });
    } else {
      // PM: Update timeout
      req.body.timeout = currentTime.toLocaleString("Asia/Manila", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Display 24-hour format
      });
    }

    const updatedStudent = await Students.findOneAndUpdate({ rfid }, req.body, {
      new: true,
    });

    if (!updatedStudent) {
      return res
        .status(404)
        .json({ message: `Cannot find any student with RFID ${rfid}` });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); */

// add admin
app.post("/student/time", async (req, res) => {
  try {
    // Extract LRN and date from the request body
    const { rfid, date } = req.body;

    // Check if there is an existing record in the database for the LRN and date
    const existingAttendance = await Attendace.findOne({ rfid, date });

    // Get the current date and time with the Philippines time zone
    const currentTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Manila",
      hour12: true,
    });

    if (existingAttendance) {
      // If a record exists, update the timeout field to the current time
      existingAttendance.timeout = currentTime;
      await existingAttendance.save();
      res.status(200).json(existingAttendance);
    } else {
      // If no record exists, create a new record with the current time as timein
      const newAttendance = await Attendace.create({
        rfid,
        date,
        timein: currentTime,
      });
      res.status(200).json(newAttendance);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

//fetch all students
app.get("/student", async (req, res) => {
  try {
    const students = await Students.find({});
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//register student
app.post("/student", async (req, res) => {
  const { lrn } = req.body;
  const { rfid } = req.body;

  try {
    // Check if the rfid is registered
    const existingRfid = await Students.findOne({ rfid: rfid });

    if (!existingRfid) {
      try {
        // Check if the email is already taken
        const existingUser = await Students.findOne({ lrn });

        if (existingUser) {
          return res.status(400).json({ message: "lrn already taken." });
        }

        // If the email is not taken, create the user
        const user = await Students.create(req.body);
        res.status(200).json(user);
        console.log("User registered!");
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    } else {
      res.status(500).json({ message: "rfid already taken" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// add admin
app.post("/admin", async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(200).json(admin);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//login
app.post("/login", async (req, res) => {
  const { username, lrn } = req.body;

  try {
    // Find the user by email
    const user = await Students.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    // Compare the provided password with the stored password
    if (user.lrn !== lrn) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect lrn." });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    // Set the token as a cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    // Respond with the token as a Bearer token
    res.status(200).json({
      message: "Authentication successful",
      token: `${token}`,
      userId: user._id,
      lrn: user.lrn,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by email
    const user = await Admin.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    // Set the token as a cookie (optional)
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    // Respond with the token as a Bearer token
    res.status(200).json({
      message: "Authentication successful",
      token: `${token}`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://javemartisano9:dSLxGyxpknuuRQb9@cluster0.8qegkio.mongodb.net/studentdatabase"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
