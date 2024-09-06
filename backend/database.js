// backend/database.js
const sqlite3 = require('sqlite3').verbose();

// Create or open the SQLite database
const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Create the Posts table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS Post (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )`);
    }
});

module.exports = db;
