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
  // res.render("./public/homepage.ejs");
  res.render(path.resolve(VIEWS, "public", "homepage.ejs"), { title: "Homepage" });
})

router.get("/login", (req, res) => {
  res.send("Login");
})

router.get("/register", (req, res) => {
  res.send("Register");
})

router.get("/reset", (req, res) => {
  res.send("Reset password");
})

router.get("/profile", (req, res) => {
  res.send("View profile details");
})

export {
  router
};