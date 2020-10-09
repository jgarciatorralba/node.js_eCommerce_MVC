// Import native 'node.js' modules
import path from "path";
import fs from "fs";

// Import dependencies
import express from "express";
import expressLayouts from "express-ejs-layouts";
import mysql from "mysql";

// Import own file 'app-config.js'
import {
  APP_PORT,
  DB_PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD
} from "./config/app-config.js";

// Alternative to '__dirname' when using ES6 modules (import)
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create connection
const db = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
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
  // Create database from read file
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
        // console.log(result);
      })
      console.log("Database created successfully!")
    });
  });
}

const app = express();

// EJS

// Import VIEWS path
import {
  VIEWS
} from "./config/app-config.js";
// Set path to folder 'views'
app.set('views', VIEWS);

// Set templating engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Set main layout folder
app.set('layout', path.resolve(VIEWS, "public", "layout.ejs"));

// Routes for views in 'views/public'
import {
  router as router_public
} from "./routes/public.js";

app.use("/", router_public);
app.use("/login", router_public);
app.use("/register", router_public);
app.use("/reset", router_public);
app.use("/profile", router_public);

// Routes for views in 'views/dashboard'
import {
  router as router_dashboard
} from "./routes/dashboard.js";

app.use("/dashboard", router_dashboard);

app.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}...`);
});