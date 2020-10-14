// Import dependency 'express'
import express from "express";

const router = express.Router();

// Import controller methods
import { PublicController } from "./../controllers/publicController.js";
const publicController = new PublicController();

// Import own middleware "auth.js"
import { AuthUtil } from "../config/auth.js";
const Auth = new AuthUtil();

// Routes
router.get("/", publicController.paginatedIndex);
router.get("/products/:page", publicController.getPageContent);
router.get("/product/:id", publicController.getProduct);
router.get("/cart", Auth.ensureAuthenticated, publicController.goToCart);
router.get("/checkout/:step", Auth.ensureAuthenticated, publicController.goToCheckout);

export {
  router
};