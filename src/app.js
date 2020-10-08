// Import native 'node.js' modules
import path from "path";
import fs from "fs";

// Alternative to '__dirname' when using ES6 modules (import)
import {
  dirname
} from "path";
import {
  fileURLToPath
} from "url";
const __dirname = dirname(fileURLToPath(
  import.meta.url));

// Import dependency 'express'
import express from "express";
// Import dependency 'mysql'
import mysql from "mysql";

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  // database: "eCommerce",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  // On connection, then do...
  console.log("MySql connected...");
  // Read 'demo_db.sql' file
  let filePath = path.resolve(__dirname, "seed", "demo_db.sql");
  createDbFromFile(filePath);
});

// Helper function to create and populate db
function createDbFromFile(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err;
    let promises = [];
    let sqlQueries = data.split(";");
    sqlQueries.forEach(sqlQuery => {
      sqlQuery = sqlQuery.trim();
      sqlQuery = sqlQuery.replace(/(\r\n|\n|\r)/gm, "");
      if (sqlQuery.startsWith("--") || sqlQuery == "") {
        return;
      } else {
        let promise = new Promise((resolve, reject) => {
          db.query(sqlQuery, (err, res) => {
            if (err) throw err;
            resolve(res);
          })
        });
        promises.push(promise);
      }
    })
    Promise.all(promises).then((results) => {
      results.forEach(result => {
        console.log(result);
      })
      console.log("Database created successfully!")
    });
  });
}

const app = express();

// Route examples
app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "views", "public"),
  });
});

app.get("/about", (req, res) => {
  res.send("My business is so cool!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});