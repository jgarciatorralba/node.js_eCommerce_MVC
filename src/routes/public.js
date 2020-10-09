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
  res.render(path.resolve(VIEWS, "public", "homepage"), { title: "Homepage" });
})

router.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  res.send("Product " + productId);
})

router.get("/cart", (req, res) => {
  res.send("Shopping cart");
})

router.get("/checkout/:step", (req, res) => {
  const checkoutStep = req.params.step;
  res.send("Checkout process - step " + checkoutStep);
})

export {
  router
};