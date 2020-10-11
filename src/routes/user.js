// Import native 'node.js' modules
import path from "path";

// Import dependency 'express'
import express from "express";

const router = express.Router();

// Import VIEWS path
import {
  VIEWS
} from "../config/app-config.js";

// Routes
router.get("/login", (req, res) => {
  res.render(path.resolve(VIEWS, "public", "login.ejs"), { title: "Login", layout: "./public/layouts/layout-user" });
})

router.get("/register", (req, res) => {
  res.render(path.resolve(VIEWS, "public", "register.ejs"), { title: "Register", layout: "./public/layouts/layout-user" });
})

router.get("/reset", (req, res) => {
  res.render(path.resolve(VIEWS, "public", "reset.ejs"), { title: "Reset password", layout: "./public/layouts/layout-user" });
})

router.get("/profile", (req, res) => {
  res.render(path.resolve(VIEWS, "public", "profile.ejs"), { title: "Profile" });
})

export {
  router
};