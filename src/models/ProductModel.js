// Import constants from own file 'app-config.js'
import {
  con
} from "./../config/app-config.js";

// Model class
export class ProductModel {

  // Constructor of the class
  constructor(){
    this.con = con;
    this.pageSize = 3;
  }

  // Get all products in the db
  get(){
    return new Promise((resolve, reject) => {
      this.con.query("SELECT * FROM products", (error, result) => {
        if (error) {
          reject(new Error("Database error"))
        }
        if (result.length == 0) {
          reject(new Error("No results found in the database"))
        } else {
          resolve(result)
        }
      })
    })
  }

  // Get products count
  getNumProducts(){
    return new Promise((resolve, reject) => {
      this.con.query("SELECT COUNT(*) AS numProducts FROM products", (error, result) => {
        if (error) {
          reject(new Error("Database error"))
        }
        if (result.length == 0) {
          reject(new Error("No results found in the database"))
        } else {
          resolve(result)
        }
      })
    })
  }

  // Get all products in the db with pagination
  getPage(page){
    return new Promise((resolve, reject) => {
      let offset = (page - 1) * this.pageSize;
      let limit = this.pageSize;
      this.con.query("SELECT * FROM products LIMIT ?, ?", [offset, limit], (error, result) => {
        if (error) {
          reject(new Error("Database error"))
        }
        if (result.length == 0) {
          reject(new Error("No results found in the database"))
        } else {
          resolve(result)
        }
      })
    })
  }

  // Get a product by its id
  getById(id){
    return new Promise((resolve, reject) => {
      this.con.query("SELECT * FROM products WHERE id = ?", [id], (error, result) => {
        if (error) {
          reject(new Error("Database error"))
        }
        if (result.length == 0) {
          reject(new Error("No results found in the database"))
        } else {
          resolve(result)
        }
      })
    })
  }
}