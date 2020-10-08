// Import native 'node.js' modules
import path from "path";

// Import dependency 'dotenv'
import {} from "dotenv/config.js";

// Application port for express
const APP_PORT = process.env.APP_PORT;

// Views folder path
const VIEWS = path.resolve(process.cwd(), "src", "views");

// Secrets


// Export all constants
export {
  APP_PORT,
  VIEWS
};