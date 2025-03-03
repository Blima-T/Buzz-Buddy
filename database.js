const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Determine database path
const dbPath = process.env.RENDER ? "/data/buzzbuddy.db" : path.join(__dirname, "buzzbuddy.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database at:", dbPath); // ✅ Log the database path
    }
});

// Create table if it doesn't exist
db.run(
    `CREATE TABLE IF NOT EXISTS responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        zip_code TEXT,
        gas_station TEXT,
        pouch_type TEXT,
        price REAL,
        rewards TEXT
    )`,
    (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
        } else {
            console.log("Table 'responses' is ready.");
        }
    }
);

module.exports = db;


