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
          resolve("You are now registered and can log in");
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

  resetPassword(customer, password){
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

  update(customer, array){
    return new Promise((resolve, reject) => {
      if (array[2] == '') {
        this.con.query("UPDATE customers SET fullname = ?, email = ? WHERE id = ?", [array[0], array[1], customer.id], (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve("User updated successfully");
          }
        })
      } else {
        this.con.query("UPDATE customers SET fullname = ?, email = ?, password = ? WHERE id = ?", [array[0], array[1], array[2], customer.id], (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve("User updated successfully");
          }
        })
      }
    })
  }
}