// Import constants from own file 'app-config.js'
import {
  con
} from "./../config/app-config.js";

// Model class
export class ImageModel {

  // Constructor of the class
  constructor(){
    this.con = con;
  }

  // Get all products in the db
  get(){
    return new Promise ((resolve, reject) => {
      this.con.query("SELECT * FROM images", (error, result) => {
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

  // Get image by its id
  getById(id){
    return new Promise((resolve, reject) => {
      this.con.query("SELECT * FROM images WHERE id = ?", [id], (error, result) => {
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

  // Get images by product id
  getByProductId(productId){
    return new Promise((resolve, reject) => {
      this.con.query("SELECT * FROM images WHERE product_id = ?", [productId], (error, result) => {
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