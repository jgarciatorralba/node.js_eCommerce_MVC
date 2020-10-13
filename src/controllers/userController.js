// Import native 'node.js' modules
import path from "path";

// Import dependencies
import bcrypt from "bcrypt";

// Import models
import { UserModel } from "../models/UserModel.js";
const User = new UserModel();

// Import constants from own file 'app-config.js'
import {
  VIEWS, SALT_ROUNDS
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

  async newUser(req, res){
    const fullname = req.body.registerName;
    const email = req.body.registerEmail;
    const password = req.body.registerPassword;
    const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
    const promise = User.create([fullname, email, hashedPassword]);
    promise.then(result => {
      res.render(
        path.resolve(VIEWS, "public", "user", "register.ejs"), { title: "Register", layout: "./public/layouts/layout-user", message: result }
      );
    }).catch(error => {
      res.render(
        path.resolve(VIEWS, "public", "user", "register.ejs"), { title: "Register", layout: "./public/layouts/layout-user", message: error }
      );
    })
  }
}