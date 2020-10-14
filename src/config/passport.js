// Import dependencies
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import bcrypt from "bcrypt";

// Import models
import { UserModel } from "../models/UserModel.js";
const User = new UserModel();

// Configuration of Passport strategy
export default function(passport){
  passport.use(
    new LocalStrategy({ usernameField: 'loginEmail', passwordField: 'loginPassword' }, (email, password, done) => {
      // Match user
      const promise = User.getByEmail(email);
      promise
        .then(results => {
          // Match password
          bcrypt.compare(password, results[0].password, (error, isMatch) => {
            if(error) throw error;
            if(isMatch){
              return done(null, results[0]);
            } else {
              return done(null, false, { message: "Password incorrect" });
            }
          });
        })
        .catch(error => {
          if (error.message !== undefined && error.message == "No results found in the database"){
            return done(null, false, { message: "That email is not registered" });
          } else {
            console.log(error);
          }
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    let promise = User.getById(id);
    promise
      .then(results => {
        done(null, results[0]);
      })
      .catch(err => {
      console.log(err);
    })
  });
}