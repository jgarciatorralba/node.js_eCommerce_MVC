// Import native 'node.js' modules
import path from "path";

// Import dependencies
import {} from "dotenv/config.js";
import mysql from "mysql";

// Application port for express
const APP_PORT = process.env.APP_PORT;

// Views folder path
const VIEWS = path.resolve(process.cwd(), "src", "views");

// Secrets

// Database credentials
const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Create connection
const con = mysql.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD
});

// Export all constants
export {
  APP_PORT,
  VIEWS,
  con
};