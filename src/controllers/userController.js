// Import native 'node.js' modules
import path from "path";

// Import models
import { UserModel } from "../models/UserModel.js";
const User = new UserModel();

// Import VIEWS path
import {
  VIEWS
} from "./../config/app-config.js";

// Controller class
export class UserController {

  goToLogin(req, res){
    res.render(path.resolve(VIEWS, "public", "user", "login.ejs"), { title: "Login", layout: "./public/layouts/layout-user" });
  }

  goToRegister(req, res){
    res.render(path.resolve(VIEWS, "public", "user", "register.ejs"), { title: "Register", layout: "./public/layouts/layout-user" });
  }

  goToReset(req, res){
    res.render(path.resolve(VIEWS, "public", "user", "reset.ejs"), { title: "Reset password", layout: "./public/layouts/layout-user" });
  }

  goToProfile(req, res){
    res.render(path.resolve(VIEWS, "public", "user", "profile.ejs"), { title: "Profile" });
  }
}