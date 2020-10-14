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

  getByEmail(email){
    return new Promise((resolve, reject) => {
      this.con.query("SELECT * FROM customers WHERE email = ?", [email], (error, result) => {
        if (error) {
          reject(error)
        }
        if (result.length == 0) {
          reject(new Error("No results found in the database"))
        } else {
          resolve(result)
        }
      })
    })
  }

  getById(id){
    return new Promise((resolve, reject) => {
      this.con.query("SELECT * FROM customers WHERE id = ?", [id], (error, result) => {
        if (error) {
          reject(error)
        }
        if (result.length == 0) {
          reject(new Error("No results found in the database"))
        } else {
          resolve(result)
        }
      })
    })
  }

  updatePassword(customer, password){
    return new Promise((resolve, reject) => {
      this.con.query("UPDATE customers SET password = ? WHERE id = ?", [password, customer.id], (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve("New password sent to email " + customer.email);
        }
      })
    })
  }
}