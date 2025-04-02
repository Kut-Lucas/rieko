
require('dotenv').config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Validate required environment variables
const requiredEnvVars = ['HOST', 'USER', 'PASS', 'DB', 'SALTROUNDS', 'JWT_SECRET'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database.");
});

// Helper function to hash passwords
const hashPassword = async (password) => {
  try {
    if (!password) throw new Error("Password is required");
    const saltRounds = parseInt(process.env.SALTROUNDS) || 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.error("Error in hashPassword:", error);
    throw error;
  }
};

// Helper function to compare passwords
const comparePassword = async (password, hashedPassword) => {
  try {
    if (!password || !hashedPassword) {
      throw new Error("Both password and hashedPassword are required");
    }
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error in comparePassword:", error);
    throw error;
  }
};

// Register a new user
app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ 
      message: "All fields are required.",
      requiredFields: ["firstName", "lastName", "email", "password"]
    });
  }

  try {
    // Check if the email already exists
    const [existingUser] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await hashPassword(password);

    // Insert the new user
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
        [firstName, lastName, email, hashedPassword]
      );

    res.status(201).json({ 
      message: "User registered successfully.",
      userId: result.insertId
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ 
      message: "Server error during registration.",
      error: error.message
    });
  }
});

// Login a user
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      message: "Email and password are required.",
      requiredFields: ["email", "password"]
    });
  }

  try {
    // Find the user by email
    const [users] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(400).json({ message: "User not found." });
    }

    const user = users[0];

    // Check if the user is approved
    if (user.status !== "approved") {
      return res.status(403).json({ message: "Your account is not approved." });
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ 
      message: "Login successful.", 
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ 
      message: "Server error during login.",
      error: error.message
    });
  }
});

// Helper function to fetch related data for a training
const fetchRelatedData = async (id) => {
  try {
    // Fetch objectives
    const [objectives] = await db.promise()
      .query("SELECT objective FROM objectives WHERE training_id = ?", [id]);

    // Fetch attendees
    const [attendees] = await db.promise()
      .query("SELECT attendee FROM attendees WHERE training_id = ?", [id]);

    // Fetch modules and their items
    const [modules] = await db.promise()
      .query("SELECT id, module_name FROM modules WHERE training_id = ?", [id]);

    const detailedModules = await Promise.all(
      modules.map(async (mod) => {
        const [items] = await db.promise()
          .query("SELECT item FROM moduleitems WHERE module_id = ?", [mod.id]);
        return { name: mod.module_name, items: items.map(i => i.item) };
      })
    );

    // Fetch benefits
    const [benefits] = await db.promise()
      .query("SELECT benefits FROM benefits WHERE training_id = ?", [id]);

    return {
      objectives: objectives.map(o => o.objective),
      attendees: attendees.map(a => a.attendee),
      modules: detailedModules,
      benefits: benefits.map(b => b.benefits)
    };
  } catch (error) {
    console.error("Error in fetchRelatedData:", error);
    throw error;
  }
};

// Fetch All Trainings
app.get("/api/trainings", async (req, res) => {
  try {
    const [results] = await db.promise().query("SELECT * FROM trainings");

    const trainings = await Promise.all(
      results.map(async (training) => {
        const relatedData = await fetchRelatedData(training.id);
        return { ...training, ...relatedData };
      })
    );

    res.status(200).json(trainings);
  } catch (error) {
    console.error("Error fetching trainings:", error);
    res.status(500).json({
      message: "Server error while fetching trainings",
      error: error.message
    });
  }
});

// Fetch Single Training by ID
app.get("/api/trainings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.promise()
      .query("SELECT * FROM trainings WHERE id = ?", [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Training not found" });
    }

    const training = results[0];
    const relatedData = await fetchRelatedData(id);

    res.status(200).json({ ...training, ...relatedData });
  } catch (error) {
    console.error("Error fetching training:", error);
    res.status(500).json({
      message: "Server error while fetching training",
      error: error.message
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


