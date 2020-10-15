// Import dependency 'express'
import express from "express";
// Import csrf
import csrf from "csurf";
const csrfProtection = csrf({cookie: true});

const router = express.Router();
router.use(csrfProtection);

// Import controller methods
import { PublicController } from "./../controllers/publicController.js";
const publicController = new PublicController();

// Import own middleware "auth.js"
import { AuthUtil } from "../config/auth.js";
const Auth = new AuthUtil();

// Routes
router.get("/", publicController.paginatedIndex);
router.get("/products/:page", publicController.getPageContent);
router.get("/product/:id", publicController.goToProduct);
router.get("/cart", Auth.ensureAuthenticated, publicController.goToCart);
router.post("/cart/addToCart", Auth.ensureAuthenticated, publicController.addToCart);
router.post("/cart/removeFromCart", Auth.ensureAuthenticated, publicController.removeFromCart);
router.get("/checkout/:step", Auth.ensureAuthenticated, publicController.goToCheckout);

export {
  router
};