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

router.get("/register", userController.goToRegister);
router.post("/register", userController.newUser);

router.get("/reset", userController.goToReset);
router.post("/reset", userController.newPassword);

router.get("/profile", userController.goToProfile);

router.get("/logout", userController.logout);

export {
  router
};