// Import native 'node.js' modules
import path from "path";

// Import dependency 'express'
import express from "express";

const router = express.Router();

// Import VIEWS path
import {
  VIEWS
} from "./../config/app-config.js";

router.get("/", (req, res) => {
  // res.render("./dashboard/dashboard.ejs");
  res.render(path.resolve(VIEWS, "dashboard", "dashboard.ejs"));
})

export {
  router
};