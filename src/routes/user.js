// Import dependency 'express'
import express from "express";

const router = express.Router();

// Import controller methods
import { UserController } from "./../controllers/userController.js";
const userController = new UserController();

// Routes
router.get("/login", userController.goToLogin);
router.get("/register", userController.goToRegister);
router.post("/register", userController.newUser);
router.get("/reset", userController.goToReset);
router.get("/profile", userController.goToProfile);

export {
  router
};