const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database"); // Import database

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Show all stored data on the main page
// Show welcome message and stored data on the main page
app.get("/", (req, res) => {
    const sql = "SELECT * FROM responses";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // Create a response object with both the message and stored data
        res.json({
            message: "Welcome to Buzz Buddy Backend!",
            data: rows
        });
    });
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




