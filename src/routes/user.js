// Import dependency 'express'
import express from "express";

const router = express.Router();

// Import controller methods
import { UserController } from "./../controllers/userController.js";
const userController = new UserController();

// Import own middleware "auth.js"
import { AuthUtil } from "../config/auth.js";
const Auth = new AuthUtil();

// Routes
router.get("/login", Auth.ensureNotAuthenticated, userController.goToLogin);
router.post("/login", userController.authenticate);
router.get("/register", Auth.ensureNotAuthenticated, userController.goToRegister);
router.post("/register", userController.newUser);
router.get("/reset", Auth.ensureNotAuthenticated, userController.goToReset);
router.post("/reset", userController.newPassword);
router.get("/profile", Auth.ensureAuthenticated, userController.goToProfile);
router.post("/profile", userController.updateProfile);
router.get("/logout", Auth.ensureAuthenticated, userController.logout);

export {
  router
};