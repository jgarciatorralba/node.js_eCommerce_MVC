// Import dependency 'express'
import express from "express";

const router = express.Router();

// Import controller methods
import * as publicController from "./../controllers/publicController.js";

// Routes
router.get("/", publicController.paginatedIndex);
router.get("/products/:page", publicController.getPageContent);
router.get("/product/:id", publicController.getProduct);
router.get("/cart", publicController.goToCart);
router.get("/checkout/:step", publicController.goToCheckout);

export {
  router
};