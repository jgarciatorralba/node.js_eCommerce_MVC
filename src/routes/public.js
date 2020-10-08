// Import dependency 'express'
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the homepage");
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