const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "documents.db"));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT,
      filepath TEXT,
      filesize INTEGER,
      created_at TEXT
    )
  `);
});

module.exports = db;
