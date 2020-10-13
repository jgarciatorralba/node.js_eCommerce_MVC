// Import constants from own file 'app-config.js'
import {
  con
} from "./../config/app-config.js";

// Model class
export class UserModel {

  constructor(){
    this.con = con;
  }

  create(array){
    return new Promise((resolve, reject) => {
      this.con.query("INSERT INTO customers (fullname, email, password) VALUES (?, ?, ?)", array, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve("New user created successfully!");
        }
      })
    })
  }
}