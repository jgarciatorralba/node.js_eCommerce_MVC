// Import dependency 'express'
import express from "express";

const router = express.Router();

// Import controller methods
import { PublicController } from "./../controllers/publicController.js";
const publicController = new PublicController();

// Import own middleware "auth.js"
import { ensureAuthenticated } from "../config/auth.js";

// Routes
router.get("/", publicController.paginatedIndex);
router.get("/products/:page", publicController.getPageContent);
router.get("/product/:id", publicController.getProduct);
router.get("/cart", ensureAuthenticated, publicController.goToCart);
router.get("/checkout/:step", publicController.goToCheckout);

export {
  router
};