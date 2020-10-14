// Import native 'node.js' modules
import path from "path";

// Import dependencies
import bcrypt from "bcrypt";
import passport from "passport";

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
    res.render(path.resolve(VIEWS, "public", "user", "profile.ejs"), { title: "Profile", user: req.user });
  }

  async newUser(req, res){
    const fullname = req.body.registerName;
    const email = req.body.registerEmail;
    const password = req.body.registerPassword;
    const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));
    const promise = User.create([fullname, email, hashedPassword]);
    promise.then(result => {
      req.flash('success_msg', result);
      res.redirect('/user/login');
    }).catch(error => {
      res.render(
        path.resolve(VIEWS, "public", "user", "register.ejs"), { title: "Register", layout: "./public/layouts/layout-user", message: error, fullname: fullname, email: email, password: password }
      );
    })
  }

  async newPassword(req, res){
    const email = req.body.resetEmail;
    const newPassword = generateString(6);
    const hashedPassword = await bcrypt.hash(newPassword, parseInt(SALT_ROUNDS));
    const promise = User.getByEmail(email);
    promise.then(results => {
      return User.updatePassword(results[0], hashedPassword)
    }).then(result => {
      res.render(
        path.resolve(VIEWS, "public", "user", "reset.ejs"), { title: "Reset password", layout: "./public/layouts/layout-user", message: result }
      );
      console.log(newPassword)
    }).catch(error => {
      res.render(
        path.resolve(VIEWS, "public", "user", "reset.ejs"), { title: "Reset password", layout: "./public/layouts/layout-user", message: error }
      )
    })
  }

  authenticate(req, res, next){
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: 'login',
      failureFlash: true
    })(req, res, next);
  }

  logout(req, res){
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect("/user/login");
  }
}

// Helper function to generate random string
function generateString(length) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}