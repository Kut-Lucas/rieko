const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "kut",
    password: "Kut@2022",
    database: "training_management",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to MySQL database");
});

// File upload setup
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

// Endpoint to create training
app.post("/trainings", upload.single("image"), (req, res) => {
    const { title, start_date, end_date, location, email, phone, duration } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const query = "INSERT INTO trainings (title, image_url, start_date, end_date, duration, location, email, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [title, imageUrl, start_date, end_date, duration, location, email, phone], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(201).json({ message: "Training created successfully", trainingId: result.insertId });
    });
});

// Server listening
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
