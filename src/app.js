// Import native 'node.js' modules
import path from "path";

// Alternative to '__dirname' when using ES6 modules (import)
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Import dependency 'express'
import express from "express";
// Import dependency 'mysql'
import mysql from "mysql";

const app = express();

app.get("/", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "views", "public"),
  });
});

app.get("/about", (req, res) => {
  res.send("My business is so cool!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
