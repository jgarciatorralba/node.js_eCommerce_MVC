// Import native 'node.js' modules
import path from "path";

// Import dependency 'express'
import express from "express";

const router = express.Router();

// Import controller methods
import * as publicController from "./../controllers/publicController.js";

// Routes
// router.get("/", publicController.index);
router.get("/", publicController.paginatedIndex);
router.get("/products/:page", publicController.getPageContent);

router.get("/product/:id", publicController.getProduct);

router.get("/cart", publicController.goToCart);

router.get("/checkout/:step", (req, res) => {
  const checkoutStep = req.params.step;
  res.send("Checkout process - step " + checkoutStep);
})

export {
  router
};