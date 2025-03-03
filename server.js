const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database"); // Import database

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Uses Render's assigned port

app.use(cors());
app.use(bodyParser.json());

// Show all stored data on the main page
app.get("/", (req, res) => {
    const sql = "SELECT * FROM responses";
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error fetching data:", err.message);
            return res.status(500).send(`<h1>Error: ${err.message}</h1>`);
        }

        console.log("Data retrieved from DB:", rows); // ✅ Logs actual DB data

        let html = `<h1>Welcome to Buzz Buddy Backend!</h1>`;
        html += `<pre>${JSON.stringify(rows, null, 2)}</pre>`; // Display data

        res.send(html);
    });
});

// Handle form submission
app.post("/submit", (req, res) => {
    const { zip_code, gas_station, pouch_type, price, rewards } = req.body;

    const sql = `INSERT INTO responses (zip_code, gas_station, pouch_type, price, rewards) VALUES (?, ?, ?, ?, ?)`;
    const values = [zip_code, gas_station, pouch_type, price, rewards];

    db.run(sql, values, function (err) {
        if (err) {
            console.error("Error inserting data:", err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log("New entry added with ID:", this.lastID); // ✅ Logs new entry
        res.json({ message: "Data stored successfully!", id: this.lastID });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});





