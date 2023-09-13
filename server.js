const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Students = require("./models/userModel");
const Attendace = require("./models/attendanceModel");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//fetch all attendace
app.get("/attendance", async (req, res) => {
  try {
    const attendace = await Attendace.find({});
    res.status(200).json(attendace);
  } catch (error) {
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

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://test:kHJMUpuEUurItgpQ@cluster.4wnoari.mongodb.net/studentdatabase"
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
