const sqlite3 = require("sqlite3").verbose();

// Open database (or create it if it doesn't exist)
const db = new sqlite3.Database("./buzzbuddy.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
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

// Export the database connection
module.exports = db;

