// Import dependency 'express'
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("./dashboard/dashboard.ejs");
})

export {
  router
};