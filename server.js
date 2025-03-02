const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database"); // Import database

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Test Route (to check if server is running)
app.get("/", (req, res) => {
    res.send("Welcome to Buzz Buddy Backend!");
});

// Handle form submission
app.post("/submit", (req, res) => {
    const { zip_code, gas_station, pouch_type, price, rewards } = req.body;

    const sql = `INSERT INTO responses (zip_code, gas_station, pouch_type, price, rewards) VALUES (?, ?, ?, ?, ?)`;
    const values = [zip_code, gas_station, pouch_type, price, rewards];

    db.run(sql, values, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Data stored successfully!", id: this.lastID });
    });
});

// ✅ NEW: Route to fetch all stored data
app.get("/data", (req, res) => {
    const sql = `SELECT * FROM responses`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


