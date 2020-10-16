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

  // Get the products in the cart for a given user
  getUserCart(id){
    return new Promise((resolve, reject) => {
      this.con.query("SELECT * FROM carts WHERE customer_id = ?", [id], (error, result) => {
        if (error) {
          reject(new Error("Database error"))
        }
        resolve(result)
      })
    })
  }

  // Get an item from the cart
  getCartItem(customer_id, product_id){
    return new Promise((resolve, reject) => {
      this.con.query("SELECT * FROM carts WHERE customer_id = ? AND product_id = ?", [customer_id, product_id], (error, result) => {
        if (error) {
          reject(new Error("Database error"))
        }
        resolve(result)
      })
    })
  }

  // Create new item in the cart
  createInCart(customer_id, product_id){
    return new Promise((resolve, reject) => {
      this.con.query("INSERT INTO carts (customer_id, product_id) VALUES (?, ?)", [customer_id, product_id], (error, result) => {
        if (error) {
          reject(new Error("Database error"))
        }
        resolve("Product added to customer cart")
      })
    })
  }

  // Delete an item from the cart
  deleteInCart(customer_id, product_id){
    return new Promise((resolve, reject) => {
      this.con.query("DELETE FROM carts WHERE customer_id = ? AND product_id = ?", [customer_id, product_id], (error, result) => {
        if (error) {
          reject(new Error("Database error"))
        }
        resolve("Product removed from customer cart")
      })
    })
  }

  // Update quantity in an item from the cart
  updateInCart(customer_id, product_id, quantity){
    return new Promise((resolve, reject) => {
      this.con.query("UPDATE carts SET quantity = ? WHERE customer_id = ? AND product_id = ?", [quantity, customer_id, product_id], (error, result) => {
        if (error) {
          reject(new Error("Database error"))
        }
        resolve("Product updated in customer cart")
      })
    })
  }

  // Update available stock of a product
  async updateStock(product_id, quantity){
    let products = await this.getById(product_id);
    let newStock = products[0].stock + quantity;

    if(newStock < 0) {
      let error = new Error("Maximum stock reached");
      return Promise.reject(error);
    }

    return new Promise((resolve, reject) => {
      this.con.query("UPDATE products SET stock = ? WHERE id = ?", [newStock, product_id], (error, result) => {
        if (error) {
          reject(new Error("Database error"))
        }
        resolve("Stock updated in product")
      })
    })
  }
}